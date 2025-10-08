from django.urls import path
from .views import StudentReportView, CourseReportView, ExportReportView

urlpatterns = [
    path('reports/student/<int:id>/', StudentReportView.as_view(), name='report-student'),
    path('reports/course/<int:id>/', CourseReportView.as_view(), name='report-course'),
    path('reports/export/', ExportReportView.as_view(), name='report-export'),
]
