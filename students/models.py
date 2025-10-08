from django.db import models
from django.conf import settings


class Student(models.Model):
    student_id = models.CharField(max_length=64, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    # course is a FK to Course; use a string because courses app will be created alongside
    course = models.ForeignKey('courses.Course', on_delete=models.SET_NULL, null=True, blank=True, related_name='students')
    year_level = models.PositiveIntegerField(null=True, blank=True)
    section = models.CharField(max_length=32, null=True, blank=True)

    def __str__(self):
        return f"{self.student_id} - {self.user.get_full_name() or self.user.username}"
