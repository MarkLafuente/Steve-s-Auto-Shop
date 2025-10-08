from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import permissions
from .models import Attendance
from .serializers import AttendanceSerializer
from accounts.permissions import IsTeacherOrReadOnly

import pandas as pd
from django.shortcuts import get_object_or_404


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsTeacherOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        student_id = self.request.query_params.get('student')
        course_id = self.request.query_params.get('course')
        date = self.request.query_params.get('date')
        if student_id:
            qs = qs.filter(student__id=student_id)
        if course_id:
            qs = qs.filter(course__id=course_id)
        if date:
            qs = qs.filter(date=date)
        return qs

    @action(detail=False, methods=['post'], parser_classes=[MultiPartParser, FormParser], permission_classes=[IsTeacherOrReadOnly])
    def upload(self, request):
        """Upload attendance via CSV or Excel. Expected columns: student_id, course_id, date, status"""
        file = request.FILES.get('file')
        if not file:
            return Response({'detail': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if file.name.endswith('.csv'):
                df = pd.read_csv(file)
            else:
                df = pd.read_excel(file)
        except Exception as e:
            return Response({'detail': f'Error reading file: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

        required = {'student_id', 'course_id', 'date', 'status'}
        if not required.issubset(set(df.columns)):
            return Response({'detail': f'File must contain columns: {required}'}, status=status.HTTP_400_BAD_REQUEST)

        created = 0
        updated = 0
        errors = []

        for idx, row in df.iterrows():
            try:
                from students.models import Student
                student = Student.objects.filter(student_id=row['student_id']).first()
                if not student:
                    errors.append({'row': idx, 'detail': 'student not found'})
                    continue

                from courses.models import Course
                course = Course.objects.filter(id=row['course_id']).first()
                if not course:
                    errors.append({'row': idx, 'detail': 'course not found'})
                    continue

                attendance_obj, created_flag = Attendance.objects.update_or_create(
                    student=student,
                    course=course,
                    date=row['date'],
                    defaults={'status': row['status']},
                )
                if created_flag:
                    created += 1
                else:
                    updated += 1
            except Exception as e:
                errors.append({'row': idx, 'detail': str(e)})

        return Response({'created': created, 'updated': updated, 'errors': errors})
