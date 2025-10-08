from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from .models import Assessment, Grade
from .serializers import AssessmentSerializer, GradeSerializer
from accounts.permissions import IsTeacherOrReadOnly
from rest_framework import permissions

import pandas as pd


class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
    permission_classes = [IsTeacherOrReadOnly]


class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    permission_classes = [IsTeacherOrReadOnly]

    @action(detail=False, methods=['post'], parser_classes=[MultiPartParser, FormParser], permission_classes=[IsTeacherOrReadOnly])
    def upload(self, request):
        """Upload grades via CSV or Excel. Expected columns: assessment_id, student_id, score_obtained"""
        file = request.FILES.get('file')
        if not file:
            return Response({'detail': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        # read with pandas
        try:
            if file.name.endswith('.csv'):
                df = pd.read_csv(file)
            else:
                # excel
                df = pd.read_excel(file)
        except Exception as e:
            return Response({'detail': f'Error reading file: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

        # required columns: assessment_id, student_id, score_obtained
        required = {'assessment_id', 'student_id', 'score_obtained'}
        if not required.issubset(set(df.columns)):
            return Response({'detail': f'File must contain columns: {required}'}, status=status.HTTP_400_BAD_REQUEST)

        created = 0
        updated = 0
        errors = []

        for idx, row in df.iterrows():
            try:
                assessment = get_object_or_404(Assessment, pk=row['assessment_id'])
                # find student by student_id
                student = None
                from students.models import Student
                student = Student.objects.filter(student_id=row['student_id']).first()
                if not student:
                    errors.append({'row': idx, 'detail': 'student not found'})
                    continue

                score = float(row['score_obtained'])

                grade, created_flag = Grade.objects.update_or_create(
                    assessment=assessment,
                    student=student,
                    defaults={'score_obtained': score},
                )
                if created_flag:
                    created += 1
                else:
                    updated += 1
            except Exception as e:
                errors.append({'row': idx, 'detail': str(e)})

        # Compute per-student average for the course and (optionally) store somewhere. Here we compute and return.
        # For each student in the file, compute weighted average across assessments in that course.
        student_ids = df['student_id'].unique().tolist()
        course_averages = []
        for sid in student_ids:
            from students.models import Student
            student = Student.objects.filter(student_id=sid).first()
            if not student:
                continue
            # get grades for student's enrollments in the course(s) included
            grades = Grade.objects.filter(student=student, assessment__course__in=Assessment.objects.filter(id__in=df['assessment_id'].unique())).select_related('assessment')
            if not grades.exists():
                continue
            total_weighted = 0.0
            total_weights = 0.0
            for g in grades:
                w = g.assessment.weight or 1.0
                total_weighted += (g.score_obtained / g.assessment.total_score) * w
                total_weights += w
            avg = (total_weighted / total_weights) * 100 if total_weights > 0 else None
            course_averages.append({'student_id': sid, 'average_percentage': avg})

        return Response({'created': created, 'updated': updated, 'errors': errors, 'averages': course_averages})
