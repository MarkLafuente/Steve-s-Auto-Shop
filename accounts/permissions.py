from rest_framework import permissions


class IsTeacherOrReadOnly(permissions.BasePermission):
    """Allow safe methods for anyone authenticated. For unsafe methods, allow if user is teacher or admin."""

    def has_permission(self, request, view):
        # Allow read permissions for authenticated users (handled globally)
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated

        # For write methods, require authenticated teacher or admin
        if not (request.user and request.user.is_authenticated):
            return False

        role = getattr(request.user, 'role', None)
        if request.user.is_superuser or request.user.is_staff:
            return True
        return role in ('TEACHER', 'ADMIN')

    def has_object_permission(self, request, view, obj):
        # For safe methods, allow
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated

        # For object-level checks: allow if user is teacher and owns the object (e.g. teacher on course)
        if request.user.is_superuser or request.user.is_staff:
            return True

        role = getattr(request.user, 'role', None)
        if role == 'TEACHER':
            # allow if obj has attribute 'teacher' and it's the current user
            teacher = getattr(obj, 'teacher', None)
            return teacher == request.user

        return False
