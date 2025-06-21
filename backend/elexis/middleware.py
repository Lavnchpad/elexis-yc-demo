from .models import MaintaineceWindow
from django.http import JsonResponse
from rest_framework import status
from django.utils import timezone
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import AnonymousUser

class MaintainenceMiddleware:
    """
    Middleware to handle maintenance mode.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if the application is in maintenance mode
        if request.path != '/maintenance' and not request.user.is_authenticated:
            return self.handle_maintenance(request)

        response = self.get_response(request)
        return response

    def handle_maintenance(self, request):
        # Redirect to the maintenance page
        if not hasattr(self, '_cached_maintenance_window'):
            self._cached_maintenance_window = MaintaineceWindow.is_maintenance_active()
        print(self._cached_maintenance_window)
        if self._cached_maintenance_window is None:
            self._cached_maintenance_window = MaintaineceWindow.is_maintenance_active()
            # If no maintenance window is active, allow the request to proceed
            return self.get_response(request)
        if self._cached_maintenance_window.end_time < timezone.now():
            # If the maintenance window has ended, clear the cached window
            self._cached_maintenance_window = MaintaineceWindow.is_maintenance_active()
        window = self._cached_maintenance_window
        if window is not None:
            # If the request is not for the maintenance page, redirect to it
            if request.path != '/maintenance':
                if request.path.startswith('/admin/'):
                    return self.get_response(request)
                print(request.user)
                # Manually authenticate JWT for non-DRF requests
                if 'HTTP_AUTHORIZATION' in request.META:
                    jwt_auth = JWTAuthentication()
                    try:
                        user_auth_tuple = jwt_auth.authenticate(request)
                        if user_auth_tuple is not None:
                            request.user, _ = user_auth_tuple
                    except Exception:
                        request.user = AnonymousUser()
                if not request.user.is_anonymous:
                    if request.user.organization:
                        if request.user.organization.is_exempt_from_maintenance:
                            return self.get_response(request)
                return JsonResponse({
                    "message": window.user_display_text,
                    "start_time": window.start_time.isoformat(),
                    "end_time": window.end_time.isoformat(),
                    "reason": window.reason
                }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        else:
            # If no maintenance window is active, allow the request to proceed
            return self.get_response(request)