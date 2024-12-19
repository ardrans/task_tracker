from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from .models import Task, Screenshot
from .serializers import (
    RegisterSerializer,UserSerializer,TaskSerializer
)

# Register View
class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer


# Task List View
class TaskListView(ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]