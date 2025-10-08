from django.db import models


class Assessment(models.Model):
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='assessments')
    title = models.CharField(max_length=255)
    total_score = models.FloatField()
    weight = models.FloatField(default=1.0)
    date_given = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.course.course_code} - {self.title}"


class Grade(models.Model):
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='grades')
    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, related_name='grades')
    score_obtained = models.FloatField()

    class Meta:
        unique_together = ('assessment', 'student')

    def __str__(self):
        return f"{self.student.student_id}: {self.assessment.title} -> {self.score_obtained}"
