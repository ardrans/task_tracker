from django.urls import path
from .views import RegisterView, TaskListView, ScreenshotUploadView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),

]