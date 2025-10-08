from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from courses.models import Course
from assessments.models import Grade, Assessment
from attendance.models import Attendance
from django.db.models import Avg, Count, Q


class TeacherDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Show courses taught by this user and basic summaries
        user = request.user
        courses = Course.objects.filter(teacher=user)
        data = []
        for c in courses:
            avg = Grade.objects.filter(assessment__course=c).aggregate(avg=Avg('score_obtained'))['avg']
            total_att = Attendance.objects.filter(course=c).count()
            present = Attendance.objects.filter(course=c, status='PRESENT').count()
            att_pct = (present / total_att * 100) if total_att > 0 else None
            data.append({'course_id': c.id, 'course_code': c.course_code, 'average': avg, 'attendance_pct': att_pct})

        return Response({'courses': data})


class StudentDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Show overall student performance and upcoming tasks (upcoming assessments)
        user = request.user
        student = getattr(user, 'student_profile', None)
        if not student:
            return Response({'detail': 'no student profile'}, status=404)

        avg = Grade.objects.filter(student=student).aggregate(avg=Avg('score_obtained'))['avg']
        from datetime import date
        upcoming = Assessment.objects.filter(course=student.course, date_given__gte=date.today()).order_by('date_given')[:5].values('id', 'title', 'date_given')
        return Response({'average': avg, 'upcoming': list(upcoming)})
