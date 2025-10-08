from django.db import models


class Attendance(models.Model):
    class Status(models.TextChoices):
        PRESENT = 'PRESENT', 'Present'
        ABSENT = 'ABSENT', 'Absent'
        LATE = 'LATE', 'Late'

    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, related_name='attendance_records')
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField()
    status = models.CharField(max_length=20, choices=Status.choices)

    class Meta:
        unique_together = ('student', 'course', 'date')

    def __str__(self):
        return f"{self.date} - {self.student.student_id} - {self.status}"
