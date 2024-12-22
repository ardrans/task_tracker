from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Task, Screenshot
from .serializers import (
    RegisterSerializer,UserSerializer,TaskSerializer,ScreenshotSerializer
)

# Register View
class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer


# Task List View
class TaskListView(ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

# Upload Screenshot
class ScreenshotUploadView(CreateAPIView):
    serializer_class = ScreenshotSerializer
    permission_classes = [IsAuthenticated]

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and is an admin
        return request.user.is_authenticated and request.user.is_admin

# Create Task View
class TaskCreateView(CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]  # Ensures the user is authenticated and an admin

    def perform_create(self, serializer):
        # Set the created_by field to the current authenticated user
        serializer.save(created_by=self.request.user)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "is_admin": user.is_admin,
        })
