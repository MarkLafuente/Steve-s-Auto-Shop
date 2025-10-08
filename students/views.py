from rest_framework import viewsets
from rest_framework import permissions
from .models import Student
from .serializers import StudentSerializer
from accounts.permissions import IsTeacherOrReadOnly


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsTeacherOrReadOnly]
