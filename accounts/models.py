from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Roles(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        TEACHER = 'TEACHER', 'Teacher'
        STUDENT = 'STUDENT', 'Student'

    # username, email, first_name, last_name are inherited from AbstractUser
    role = models.CharField(max_length=20, choices=Roles.choices, default=Roles.STUDENT)

    def __str__(self):
        return f"{self.username} ({self.role})"
