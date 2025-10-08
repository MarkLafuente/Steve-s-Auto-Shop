from django.urls import path
from .views import TeacherDashboardView, StudentDashboardView

urlpatterns = [
    path('dashboard/teacher/', TeacherDashboardView.as_view(), name='dashboard-teacher'),
    path('dashboard/student/', StudentDashboardView.as_view(), name='dashboard-student'),
]
