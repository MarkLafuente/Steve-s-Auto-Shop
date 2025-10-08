from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Count, Q
from students.models import Student
from courses.models import Course
from assessments.models import Grade, Assessment
from attendance.models import Attendance

import pandas as pd
from datetime import datetime


class StudentInsightsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        student = get_object_or_404(Student, id=id)

        # Average grade across all grades
        avg_grade = Grade.objects.filter(student=student).aggregate(avg=Avg('score_obtained'))['avg']

        # Attendance %: present / total
        attendance_stats = Attendance.objects.filter(student=student).aggregate(
            total=Count('id'),
            present=Count('id', filter=Q(status='PRESENT')),
        )
        total_att = attendance_stats.get('total') or 0
        present = attendance_stats.get('present') or 0
        attendance_pct = (present / total_att * 100) if total_att > 0 else None

        # Performance trend (by assessment date) using pandas
        grades_qs = Grade.objects.filter(student=student).select_related('assessment')
        if grades_qs.exists():
            rows = []
            for g in grades_qs:
                rows.append({'date': g.assessment.date_given or datetime.today().date(), 'pct': (g.score_obtained / g.assessment.total_score) * 100})
            df = pd.DataFrame(rows)
            df['date'] = pd.to_datetime(df['date'])
            df = df.sort_values('date')
            trend = df.groupby(pd.Grouper(key='date', freq='W'))['pct'].mean().reset_index().to_dict(orient='records')
        else:
            trend = []

        return Response({'average_grade': avg_grade, 'attendance_percentage': attendance_pct, 'trend': trend})


class CourseInsightsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        course = get_object_or_404(Course, id=id)

        # Overall course average (from grades)
        avg = Grade.objects.filter(assessment__course=course).aggregate(avg=Avg('score_obtained'))['avg']

        # Attendance summary per course
        total = Attendance.objects.filter(course=course).count()
        present = Attendance.objects.filter(course=course, status='PRESENT').count()
        attendance_pct = (present / total * 100) if total > 0 else None

        return Response({'course_average': avg, 'attendance_percentage': attendance_pct})


class AtRiskView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Simplistic at-risk detection: avg grade < 50 or attendance% < 60
        students = Student.objects.all()
        at_risk = []
        for s in students:
            avg = Grade.objects.filter(student=s).aggregate(avg=Avg('score_obtained'))['avg']
            att = Attendance.objects.filter(student=s).aggregate(total=Count('id'), present=Count('id', filter=Q(status='PRESENT')))
            total = att.get('total') or 0
            present = att.get('present') or 0
            att_pct = (present / total * 100) if total > 0 else None
            if (avg is not None and avg < 50) or (att_pct is not None and att_pct < 60):
                at_risk.append({'student_id': s.student_id, 'avg': avg, 'attendance_pct': att_pct})

        return Response({'at_risk': at_risk})


class TrendsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Trend across all students: weekly average percentage
        grades_qs = Grade.objects.select_related('assessment')
        rows = []
        for g in grades_qs:
            rows.append({'date': g.assessment.date_given or datetime.today().date(), 'pct': (g.score_obtained / g.assessment.total_score) * 100})
        if rows:
            df = pd.DataFrame(rows)
            df['date'] = pd.to_datetime(df['date'])
            weekly = df.groupby(pd.Grouper(key='date', freq='W'))['pct'].mean().reset_index().to_dict(orient='records')
        else:
            weekly = []

        return Response({'weekly_trend': weekly})
