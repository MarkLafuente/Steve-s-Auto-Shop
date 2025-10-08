"""
URL configuration for student_performance_dashboard project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

# If apps expose routers (students, courses, assessments, etc.), include them here by
# importing and registering their viewsets with the central router. For now, we
# include existing app URL modules under /api/ and expose the router at /api/.

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # Keep auth routes separately (they include register/login/profile etc.)
    path('api/auth/', include('accounts.urls')),

    # Include app-level URLs that are not registered on the central router
    path('api/', include('students.urls')),
    path('api/', include('courses.urls')),
    path('api/', include('assessments.urls')),
    path('api/', include('attendance.urls')),
    path('api/', include('analytics.urls')),
    path('api/', include('reports.urls')),
    path('api/', include('uploads.urls')),
    path('api/', include('dashboard.urls')),
]
