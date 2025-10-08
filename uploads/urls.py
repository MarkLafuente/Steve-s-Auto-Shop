from django.urls import path
from .views import UploadStudentsView, UploadCoursesView, UploadGradesView, UploadAttendanceView, TemplateDownloadView

urlpatterns = [
    path('upload/students/', UploadStudentsView.as_view(), name='upload-students'),
    path('upload/courses/', UploadCoursesView.as_view(), name='upload-courses'),
    path('upload/grades/', UploadGradesView.as_view(), name='upload-grades'),
    path('upload/attendance/', UploadAttendanceView.as_view(), name='upload-attendance'),

    # Template downloads
    path('upload/templates/<str:template_name>/', TemplateDownloadView.as_view(), name='upload-template-download'),
]
