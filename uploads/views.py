from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.parsers import MultiPartParser, FormParser
import pandas as pd

from students.models import Student
from courses.models import Course
from assessments.models import Assessment, Grade
from attendance.models import Attendance

from django.shortcuts import get_object_or_404
from django.http import HttpResponse, Http404
from pathlib import Path
import csv
from typing import List

# Template folder
TEMPLATE_DIR = Path(__file__).resolve().parent / 'templates'
TEMPLATE_DIR.mkdir(parents=True, exist_ok=True)


def normalize_columns(df):
    """Normalize common header variants to canonical column names used by processors."""
    mapping = {
        # students
        'studentid': 'student_id',
        'student_id': 'student_id',
        'student-id': 'student_id',
        'student id': 'student_id',
        'username': 'username',
        'user_name': 'username',
        'email': 'email',
        'first_name': 'first_name',
        'firstname': 'first_name',
        'last_name': 'last_name',
        'lastname': 'last_name',
        'yearlevel': 'year_level',
        'year_level': 'year_level',
        'section': 'section',

        # courses
        'coursecode': 'course_code',
        'course_code': 'course_code',
        'course-code': 'course_code',
        'title': 'title',
        'teacher_username': 'teacher_username',
        'teacher': 'teacher_username',
        'semester': 'semester',
        'academic_year': 'academic_year',

        # assessments
        'assessment_id': 'assessment_id',
        'assessmentid': 'assessment_id',
        'score_obtained': 'score_obtained',
        'score': 'score_obtained',

        # attendance
        'course_id': 'course_id',
        'courseid': 'course_id',
        'date': 'date',
        'status': 'status',
    }

    new_cols = {}
    for col in df.columns:
        key = col.strip().lower().replace(' ', '').replace('-', '').replace('_', '')
        canonical = mapping.get(key, None)
        if canonical:
            new_cols[col] = canonical
        else:
            # try direct lowercase match
            if col in mapping:
                new_cols[col] = mapping[col]
            else:
                new_cols[col] = col  # leave as-is
    df = df.rename(columns=new_cols)
    return df


# Create CSV templates if they don't exist
def write_template(path: Path, headers: List[str], sample: List[str]):
    if path.exists():
        return
    with open(path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerow(sample)


# Students template
write_template(TEMPLATE_DIR / 'students_template.csv', ['student_id', 'username', 'email', 'first_name', 'last_name', 'year_level', 'section'], ['S20251001', 'alice.alvarez', 'alice@example.com', 'Alice', 'Alvarez', '2', 'A'])

# Courses template
write_template(TEMPLATE_DIR / 'courses_template.csv', ['course_code', 'title', 'teacher_username', 'semester', 'academic_year'], ['CS101', 'Intro to CS', 'seed_teacher_1', 'Fall', '2025'])

# Grades template
write_template(TEMPLATE_DIR / 'grades_template.csv', ['assessment_id', 'student_id', 'score_obtained'], ['1', 'S20251001', '87.5'])

# Attendance template
write_template(TEMPLATE_DIR / 'attendance_template.csv', ['student_id', 'course_id', 'date', 'status'], ['S20251001', '1', '2025-10-01', 'Present'])


class TemplateDownloadView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, template_name: str):
        # safe map of allowed templates
        allowed = {
            'students': 'students_template.csv',
            'courses': 'courses_template.csv',
            'grades': 'grades_template.csv',
            'attendance': 'attendance_template.csv',
        }
        filename = allowed.get(template_name)
        if not filename:
            raise Http404('Template not found')
        path = TEMPLATE_DIR / filename
        if not path.exists():
            raise Http404('Template file missing on server')

        with open(path, 'rb') as f:
            data = f.read()

        resp = HttpResponse(data, content_type='text/csv')
        resp['Content-Disposition'] = f'attachment; filename="{filename}"'
        return resp


class UploadStudentsView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        f = request.FILES.get('file')
        if not f:
            return Response({'detail': 'file required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            if f.name.endswith('.csv'):
                df = pd.read_csv(f)
            else:
                df = pd.read_excel(f)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Normalize column headers to support common variants
        df = normalize_columns(df)

        # expected columns: student_id, username, email, first_name, last_name, year_level, section
        required = {'student_id', 'username'}
        if not required.issubset(set(df.columns)):
            return Response({'detail': f'required columns: {required}. Found: {list(df.columns)}'}, status=status.HTTP_400_BAD_REQUEST)

        created = 0
        updated = 0
        for idx, row in df.iterrows():
            try:
                # create or update user + student profile
                from django.contrib.auth import get_user_model
                User = get_user_model()
                user, ucreated = User.objects.get_or_create(username=row['username'], defaults={
                    'email': row.get('email', ''),
                    'first_name': row.get('first_name', ''),
                    'last_name': row.get('last_name', ''),
                })
                if not ucreated:
                    user.email = row.get('email', user.email)
                    user.first_name = row.get('first_name', user.first_name)
                    user.last_name = row.get('last_name', user.last_name)
                    user.save()

                student, screated = Student.objects.get_or_create(student_id=row['student_id'], defaults={'user': user, 'year_level': row.get('year_level'), 'section': row.get('section')})
                if not screated:
                    student.user = user
                    student.year_level = row.get('year_level') or student.year_level
                    student.section = row.get('section') or student.section
                    student.save()
                if screated:
                    created += 1
                else:
                    updated += 1
            except Exception as e:
                continue

        return Response({'created': created, 'updated': updated})


class UploadCoursesView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        f = request.FILES.get('file')
        if not f:
            return Response({'detail': 'file required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            if f.name.endswith('.csv'):
                df = pd.read_csv(f)
            else:
                df = pd.read_excel(f)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        df = normalize_columns(df)

        # expected: course_code, title, teacher_username, semester, academic_year
        required = {'course_code', 'title'}
        if not required.issubset(set(df.columns)):
            return Response({'detail': f'required columns: {required}. Found: {list(df.columns)}'}, status=status.HTTP_400_BAD_REQUEST)

        created = 0
        updated = 0
        from django.contrib.auth import get_user_model
        User = get_user_model()
        for idx, row in df.iterrows():
            teacher = None
            if 'teacher_username' in row and pd.notna(row['teacher_username']):
                teacher = User.objects.filter(username=row['teacher_username']).first()
            course, ccreated = Course.objects.update_or_create(course_code=row['course_code'], defaults={'title': row['title'], 'teacher': teacher, 'semester': row.get('semester', ''), 'academic_year': row.get('academic_year', '')})
            if ccreated:
                created += 1
            else:
                updated += 1

        return Response({'created': created, 'updated': updated})


class UploadGradesView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        f = request.FILES.get('file')
        if not f:
            return Response({'detail': 'file required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            if f.name.endswith('.csv'):
                df = pd.read_csv(f)
            else:
                df = pd.read_excel(f)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        df = normalize_columns(df)

        # expected: assessment_id, student_id, score_obtained
        required = {'assessment_id', 'student_id', 'score_obtained'}
        if not required.issubset(set(df.columns)):
            return Response({'detail': f'required columns: {required}. Found: {list(df.columns)}'}, status=status.HTTP_400_BAD_REQUEST)

        created = 0
        updated = 0
        for idx, row in df.iterrows():
            try:
                assessment = Assessment.objects.filter(id=row['assessment_id']).first()
                if not assessment:
                    continue
                student = Student.objects.filter(student_id=row['student_id']).first()
                if not student:
                    continue
                grade, gcreated = Grade.objects.update_or_create(assessment=assessment, student=student, defaults={'score_obtained': row['score_obtained']})
                if gcreated:
                    created += 1
                else:
                    updated += 1
            except Exception:
                continue

        return Response({'created': created, 'updated': updated})


class UploadAttendanceView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        f = request.FILES.get('file')
        if not f:
            return Response({'detail': 'file required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            if f.name.endswith('.csv'):
                df = pd.read_csv(f)
            else:
                df = pd.read_excel(f)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        df = normalize_columns(df)

        required = {'student_id', 'course_id', 'date', 'status'}
        if not required.issubset(set(df.columns)):
            return Response({'detail': f'required columns: {required}. Found: {list(df.columns)}'}, status=status.HTTP_400_BAD_REQUEST)

        created = 0
        updated = 0
        for idx, row in df.iterrows():
            try:
                student = Student.objects.filter(student_id=row['student_id']).first()
                course = Course.objects.filter(id=row['course_id']).first()
                if not student or not course:
                    continue
                att, acreated = Attendance.objects.update_or_create(student=student, course=course, date=row['date'], defaults={'status': row['status']})
                if acreated:
                    created += 1
                else:
                    updated += 1
            except Exception:
                continue

        return Response({'created': created, 'updated': updated})
