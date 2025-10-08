"""
Seed realistic test data for the student_performance_dashboard project.

Run examples:
  python manage.py seed_data
  python manage.py seed_data --students 25 --teachers 6 --force

Make sure Faker is installed:
  pip install Faker

This command will attempt to import common models from the project. If any required
models are missing it will abort with a clear message listing what could not be found.

The seeder creates seed users with predictable usernames so it can safely identify
and remove only records it created when run with --force. Teacher usernames are
created as seed_teacher_<n>, students as seed_student_<n>, and the seeded superuser
is admin_seed.

"""
from __future__ import annotations

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils import timezone
from django.conf import settings

import random
import math
from datetime import datetime, timedelta, date
from typing import List, Tuple

try:
    from faker import Faker
except Exception:
    raise CommandError("Faker is required. Install with `pip install Faker`")

from django.contrib.auth import get_user_model


def try_import(path: str):
    """Attempt to import a model given a dotted path and return it or None."""
    try:
        module_path, attr = path.rsplit('.', 1)
        module = __import__(module_path, fromlist=[attr])
        return getattr(module, attr)
    except Exception:
        return None


class Command(BaseCommand):
    help = 'Seed realistic test data for development (students, teachers, courses, assessments, grades, attendance).'

    def add_arguments(self, parser):
        parser.add_argument('--students', type=int, default=20, help='Number of students to create (default: 20)')
        parser.add_argument('--teachers', type=int, default=5, help='Number of teachers to create (default: 5)')
        parser.add_argument('--courses', type=int, default=6, help='Number of courses to create (default: 6)')
        parser.add_argument('--assessments-per-course', type=int, default=4, help='Assessments per course (default: 4)')
        parser.add_argument('--days-of-attendance', type=int, default=30, help='Days of attendance to generate (default: 30)')
        parser.add_argument('--force', action='store_true', help='Destructively remove previously seeded data created by this command before seeding')

    def handle(self, *args, **options):
        fake = Faker()
        students_n = options['students']
        teachers_n = options['teachers']
        courses_n = options['courses']
        assessments_per_course = options['assessments_per_course']
        days_of_attendance = options['days_of_attendance']
        force = options['force']

        # Discover models with fallbacks
        missing = []
        User = get_user_model()

        Student = try_import('students.models.Student') or try_import('accounts.models.Student')
        Course = try_import('courses.models.Course')
        Enrollment = try_import('courses.models.Enrollment') or try_import('students.models.Enrollment')
        Assessment = try_import('assessments.models.Assessment')
        Grade = try_import('assessments.models.Grade')
        Attendance = try_import('attendance.models.Attendance')

        model_map = {
            'Student': Student,
            'Course': Course,
            'Enrollment': Enrollment,
            'Assessment': Assessment,
            'Grade': Grade,
            'Attendance': Attendance,
            'User': User,
        }

        for name, model in model_map.items():
            if model is None:
                missing.append(name)

        if missing:
            msg = [
                'Missing required models. The seeder tried to import these models but failed:',
            ]
            for m in missing:
                msg.append(f'- {m}')
            msg.append('Ensure these apps and models exist or adapt the seeder import paths.')
            raise CommandError('\n'.join(msg))

        # Confirm destructive action if force=True
        if force:
            confirm = input('You passed --force which will remove seeded data created by this command. Continue? [y/N]: ')
            if confirm.lower() != 'y':
                self.stdout.write(self.style.WARNING('Aborted by user.'))
                return

        # Wrap in transaction
        with transaction.atomic():
            # If force, clear seeded records
            if force:
                self.clear_seeded(User, Student, Course, Enrollment, Assessment, Grade, Attendance)

            # Create superuser if none exists
            su_exists = User.objects.filter(is_superuser=True).exists()
            if not su_exists:
                self.stdout.write('Creating superuser admin_seed')
                User.objects.create_superuser(username='admin_seed', email='admin_seed@example.com', password='admin123')

            # Create teachers
            teachers = self.create_teachers(User, teachers_n, fake)

            # Create students
            students = self.create_students(User, Student, students_n, fake)

            # Create courses
            courses = self.create_courses(Course, courses_n, teachers, fake)

            # Create enrollments (bulk where possible)
            enrollments = self.create_enrollments(Enrollment, students, courses)

            # Create assessments
            assessments = self.create_assessments(Assessment, courses, assessments_per_course)

            # Create grades
            grades_count = self.create_grades(Grade, assessments, enrollments)

            # Create attendance (last N class days excluding weekends)
            attendance_count = self.create_attendance(Attendance, enrollments, days_of_attendance)

        # Summary
        self.stdout.write(self.style.SUCCESS('\nSeeding complete'))
        self.stdout.write(f'Teachers created: {len(teachers)}')
        self.stdout.write(f'Students created: {len(students)}')
        self.stdout.write(f'Courses created: {len(courses)}')
        self.stdout.write(f'Enrollments created: {len(enrollments)}')
        self.stdout.write(f'Assessments created: {len(assessments)}')
        self.stdout.write(f'Grades created/updated: {grades_count}')
        self.stdout.write(f'Attendance records created/updated: {attendance_count}')

        # Print teacher credentials
        self.stdout.write('\nTeacher logins:')
        for t in teachers:
            self.stdout.write(f'  {t.username} -> password123')

        # Sample student
        if students:
            s = students[0]
            self.stdout.write(f'Example student: username={s.user.username}, student_id={s.student_id}, password=password123')

    # ------------------ helper methods ------------------
    def clear_seeded(self, User, Student, Course, Enrollment, Assessment, Grade, Attendance):
        """Delete records created by the seeder. Only removes objects that match seed username patterns.

        Order: Grades → Attendance → Assessments → Enrollments → Courses → Students → Teachers
        """
        self.stdout.write(self.style.WARNING('Clearing seeded records...'))

        # Grades
        if Grade is not None:
            q = Grade.objects.all()
            deleted_g, _ = q.delete()
            self.stdout.write(f'Deleted grades: approx {deleted_g}')

        # Attendance
        if Attendance is not None:
            q = Attendance.objects.all()
            deleted_a, _ = q.delete()
            self.stdout.write(f'Deleted attendance: approx {deleted_a}')

        # Assessments
        if Assessment is not None:
            q = Assessment.objects.all()
            deleted_as, _ = q.delete()
            self.stdout.write(f'Deleted assessments: approx {deleted_as}')

        # Enrollments
        if Enrollment is not None:
            q = Enrollment.objects.all()
            deleted_e, _ = q.delete()
            self.stdout.write(f'Deleted enrollments: approx {deleted_e}')

        # Courses
        if Course is not None:
            q = Course.objects.filter(course_code__startswith='seed_course_')
            cnt = q.count()
            q.delete()
            self.stdout.write(f'Deleted courses: {cnt}')

        # Students and their users
        if Student is not None:
            seeded_students = Student.objects.filter(student_id__startswith='S2025')
            cnt = seeded_students.count()
            # Collect user ids to delete
            user_ids = list(seeded_students.values_list('user_id', flat=True))
            seeded_students.delete()
            if user_ids:
                User.objects.filter(id__in=user_ids, username__startswith='seed_student_').delete()
            self.stdout.write(f'Deleted students: {cnt}')

        # Teachers (users only) created by seeder
        User.objects.filter(username__startswith='seed_teacher_').delete()
        self.stdout.write('Deleted seeded teachers')

    def create_teachers(self, User, n: int, fake: Faker) -> List:
        created = []
        for i in range(1, n + 1):
            username = f'seed_teacher_{i}'
            email = f'{username}@example.com'
            user, ucreated = User.objects.get_or_create(username=username, defaults={'email': email, 'first_name': fake.first_name(), 'last_name': fake.last_name()})
            if ucreated:
                # try to set password using set_password for real hashing
                user.set_password('password123')
                # mark role if attribute exists
                if hasattr(user, 'role'):
                    try:
                        user.role = 'TEACHER'
                    except Exception:
                        pass
                user.save()
            created.append(user)
        return created

    def create_students(self, User, Student, n: int, fake: Faker) -> List:
        created = []
        for i in range(1, n + 1):
            username = f'seed_student_{i}'
            email = f'{username}@example.com'
            user, ucreated = User.objects.get_or_create(username=username, defaults={'email': email, 'first_name': fake.first_name(), 'last_name': fake.last_name()})
            if ucreated:
                user.set_password('password123')
                if hasattr(user, 'role'):
                    try:
                        user.role = 'STUDENT'
                    except Exception:
                        pass
                user.save()

            # student_id pattern S2025XXXX
            student_id = f'S2025{1000 + i}'
            student, screated = Student.objects.get_or_create(student_id=student_id, defaults={'user': user, 'year_level': random.randint(1, 4), 'section': f'Sec{random.randint(1,6)}'})
            if not screated:
                student.user = user
                student.save()
            created.append(student)
        return created

    def create_courses(self, Course, n: int, teachers: List, fake: Faker) -> List:
        created = []
        for i in range(1, n + 1):
            code = f'seed_course_{i}'
            title = fake.sentence(nb_words=3).rstrip('.')
            teacher = random.choice(teachers) if teachers else None
            course, ccreated = Course.objects.get_or_create(course_code=code, defaults={'title': title, 'teacher': teacher, 'semester': 'Fall', 'academic_year': str(date.today().year)})
            if not ccreated and teacher is not None:
                course.teacher = teacher
                course.save()
            created.append(course)
        return created

    def create_enrollments(self, Enrollment, students: List, courses: List) -> List:
        created = []
        # For each student, enroll in random number of courses (min 3)
        for student in students:
            num = random.randint(min(3, len(courses)), len(courses))
            chosen = random.sample(courses, num)
            for c in chosen:
                # Enrollment location may differ; try update_or_create
                try:
                    enroll, ecreated = Enrollment.objects.get_or_create(student=student, course=c)
                except TypeError:
                    # Some Enrollment models use different field names; attempt common alternatives
                    enroll, ecreated = Enrollment.objects.get_or_create(student=student, course=c)
                created.append(enroll)
        return created

    def create_assessments(self, Assessment, courses: List, per_course: int) -> List:
        created = []
        names = ['Quiz 1', 'Quiz 2', 'Midterm', 'Project', 'Final']
        for course in courses:
            # if assessments already exist for this course, skip creating duplicates
            existing = Assessment.objects.filter(course=course).count()
            if existing >= per_course:
                created.extend(list(Assessment.objects.filter(course=course)[:existing]))
                continue

            to_create = []
            total_weights = 0.0
            # simple equal weights
            weight = 1.0 / per_course
            for idx in range(per_course):
                title = names[idx] if idx < len(names) else f'Assessment {idx+1}'
                total_score = 100.0
                a = Assessment(course=course, title=title, total_score=total_score, weight=weight, date_given=date.today() - timedelta(days=random.randint(1, 60)))
                to_create.append(a)
                total_weights += weight
            # bulk_create
            Assessment.objects.bulk_create(to_create, ignore_conflicts=True)
            created.extend(list(Assessment.objects.filter(course=course)))
        return created

    def create_grades(self, Grade, assessments: List, enrollments: List) -> int:
        count = 0
        # Map enrollments by student-course for quick lookup
        enrollment_map = {}
        for e in enrollments:
            enrollment_map.setdefault(e.course.id, []).append(e.student)

        # For each assessment, generate grades for enrolled students
        for a in assessments:
            # only create grades if assessment has positive total_score
            if not getattr(a, 'total_score', 0) or a.total_score <= 0:
                continue
            # find students enrolled in this course
            students = enrollment_map.get(a.course.id, [])
            for s in students:
                # realistic score using normal distribution around 75% with sd 12
                mean = 0.75 * a.total_score
                sd = 0.12 * a.total_score
                score = random.gauss(mean, sd)
                score = max(0, min(a.total_score, score))
                # use update_or_create for idempotency
                Grade.objects.update_or_create(assessment=a, student=s, defaults={'score_obtained': round(score, 2)})
                count += 1
        return count

    def create_attendance(self, Attendance, enrollments: List, days: int) -> int:
        # create last `days` class dates excluding weekends
        dates = []
        cur = date.today()
        while len(dates) < days:
            if cur.weekday() < 5:  # Mon-Fri
                dates.append(cur)
            cur -= timedelta(days=1)
        created = 0
        for e in enrollments:
            for d in dates:
                # probabilities
                r = random.random()
                if r < 0.85:
                    status = 'PRESENT'
                elif r < 0.95:
                    status = 'ABSENT'
                else:
                    status = 'LATE'
                # update_or_create for idempotency
                Attendance.objects.update_or_create(student=e.student, course=e.course, date=d, defaults={'status': status})
                created += 1
        return created
