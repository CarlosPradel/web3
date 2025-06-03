from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminRol(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, 'rol', None) == 'administrador'


class IsReadOnly(BasePermission):

    def has_permission(self, request, view):
        return request.method in SAFE_METHODS
