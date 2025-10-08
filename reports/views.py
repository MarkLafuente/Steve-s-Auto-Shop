from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from students.models import Student
from courses.models import Course
from assessments.models import Grade, Assessment
from attendance.models import Attendance

import pandas as pd
from io import BytesIO

# reportlab for PDF generation
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


class StudentReportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        student = get_object_or_404(Student, id=id)
        # Simple report: grades and attendance summary
        grades = Grade.objects.filter(student=student).select_related('assessment')
        grade_rows = []
        for g in grades:
            grade_rows.append({'assessment': g.assessment.title, 'score': g.score_obtained, 'total': g.assessment.total_score})

        att_total = Attendance.objects.filter(student=student).count()
        att_present = Attendance.objects.filter(student=student, status='PRESENT').count()
        att_pct = (att_present / att_total * 100) if att_total > 0 else None

        return Response({'student': student.student_id, 'grades': grade_rows, 'attendance_pct': att_pct})


class CourseReportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        course = get_object_or_404(Course, id=id)
        grades = Grade.objects.filter(assessment__course=course).select_related('assessment', 'student')
        # Summarize per student
        df_rows = []
        for g in grades:
            df_rows.append({'student_id': g.student.student_id, 'assessment': g.assessment.title, 'score': g.score_obtained, 'total': g.assessment.total_score})
        df = pd.DataFrame(df_rows)
        if not df.empty:
            summary = df.groupby('student_id').apply(lambda d: (d['score'].sum() / d['total'].sum()) * 100 if d['total'].sum() else None).reset_index().rename(columns={0: 'percentage'}).to_dict(orient='records')
        else:
            summary = []

        return Response({'course': course.course_code, 'summary': summary})


class ExportReportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        fmt = request.query_params.get('format', 'csv')
        report_type = request.query_params.get('type', 'student')
        id = request.query_params.get('id')
        if not id:
            return Response({'detail': 'id is required'}, status=status.HTTP_400_BAD_REQUEST)

        if report_type == 'student':
            student = get_object_or_404(Student, id=id)
            grades = Grade.objects.filter(student=student).select_related('assessment')
            rows = [{'assessment': g.assessment.title, 'score': g.score_obtained, 'total': g.assessment.total_score} for g in grades]
            df = pd.DataFrame(rows)
            if fmt == 'csv':
                resp = HttpResponse(content_type='text/csv')
                resp['Content-Disposition'] = f'attachment; filename=student_{student.student_id}_report.csv'
                df.to_csv(resp, index=False)
                return resp
            else:
                # PDF
                buffer = BytesIO()
                p = canvas.Canvas(buffer, pagesize=letter)
                y = 750
                p.drawString(50, y, f"Student Report: {student.student_id}")
                y -= 30
                for r in rows:
                    p.drawString(50, y, f"{r['assessment']}: {r['score']} / {r['total']}")
                    y -= 20
                p.showPage()
                p.save()
                buffer.seek(0)
                return HttpResponse(buffer, content_type='application/pdf')

        elif report_type == 'course':
            course = get_object_or_404(Course, id=id)
            grades = Grade.objects.filter(assessment__course=course).select_related('assessment', 'student')
            rows = [{'student_id': g.student.student_id, 'assessment': g.assessment.title, 'score': g.score_obtained, 'total': g.assessment.total_score} for g in grades]
            df = pd.DataFrame(rows)
            if fmt == 'csv':
                resp = HttpResponse(content_type='text/csv')
                resp['Content-Disposition'] = f'attachment; filename=course_{course.course_code}_report.csv'
                df.to_csv(resp, index=False)
                return resp
            else:
                buffer = BytesIO()
                p = canvas.Canvas(buffer, pagesize=letter)
                y = 750
                p.drawString(50, y, f"Course Report: {course.course_code}")
                y -= 30
                for r in rows:
                    p.drawString(50, y, f"{r['student_id']} - {r['assessment']}: {r['score']} / {r['total']}")
                    y -= 20
                p.showPage()
                p.save()
                buffer.seek(0)
                return HttpResponse(buffer, content_type='application/pdf')

        else:
            return Response({'detail': 'unknown report type'}, status=status.HTTP_400_BAD_REQUEST)
