from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from .models import Task, Screenshot
from .serializers import (
    RegisterSerializer
)

# Register View
class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
