from django.urls import path
from .views import StudentInsightsView, CourseInsightsView, AtRiskView, TrendsView

urlpatterns = [
    path('insights/student/<int:id>/', StudentInsightsView.as_view(), name='insights-student'),
    path('insights/course/<int:id>/', CourseInsightsView.as_view(), name='insights-course'),
    path('insights/at-risk/', AtRiskView.as_view(), name='insights-at-risk'),
    path('insights/trends/', TrendsView.as_view(), name='insights-trends'),
]
