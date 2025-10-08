from django.db import models
from django.conf import settings


class Course(models.Model):
    course_code = models.CharField(max_length=32, unique=True)
    title = models.CharField(max_length=255)
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='courses')
    semester = models.CharField(max_length=32)
    academic_year = models.CharField(max_length=32)

    def __str__(self):
        return f"{self.course_code} - {self.title}"


class Enrollment(models.Model):
    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    date_enrolled = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'course')

    def __str__(self):
        return f"{self.student} -> {self.course}"
