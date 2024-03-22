from rest_framework import permissions



class MachinePermissions(permissions.BasePermission):
    """Права доступа к MachineView"""
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return request.method == 'GET'
        user = request.user
        if user.is_authenticated:
            if hasattr(user, 'client'):
                return request.method == 'GET'
            elif hasattr(user, 'servicecompany'):
                return request.method == 'GET'
            elif hasattr(user, 'manager'):
                return request.method in ['GET', 'POST']
            return False


class ComplaintPermissions(permissions.BasePermission):
    """Права доступа к ComplaintView"""
    def has_permission(self, request, view):
        user = request.user
        if user.is_authenticated:
            if hasattr(user, 'client'):
                return request.method == 'GET'
            elif hasattr(user, 'servicecompany'):
                return request.method in ['GET', 'POST']
            elif hasattr(user, 'manager'):
                return request.method in ['GET', 'POST']
            return False


class ListsPermissions(permissions.BasePermission):
    """Права доступа к спискам"""
    def has_permission(self, request, view):
        user = request.user
        if user.is_authenticated:
            if hasattr(user, 'client'):
                return request.method == 'GET'
            elif hasattr(user, 'servicecompany'):
                return request.method in ['GET']
            elif hasattr(user, 'manager'):
                return request.method in ['GET', 'POST', 'PUT', 'DELETE']
            return False
