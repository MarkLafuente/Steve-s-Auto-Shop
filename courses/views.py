from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Course, Enrollment
from .serializers import CourseSerializer, EnrollmentSerializer
from rest_framework import permissions
from accounts.permissions import IsTeacherOrReadOnly


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsTeacherOrReadOnly]

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def students(self, request, pk=None):
        course = self.get_object()
        enrollments = course.enrollments.select_related('student', 'student__user')
        data = [
            {
                'student_id': e.student.student_id,
                'user': e.student.user.id,
                'name': e.student.user.get_full_name() or e.student.user.username,
                'date_enrolled': e.date_enrolled,
            }
            for e in enrollments
        ]
        return Response(data)


class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsTeacherOrReadOnly]
