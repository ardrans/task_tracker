from django.urls import path
from .views import RegisterView, TaskListView, ScreenshotUploadView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('tasks/', TaskListView.as_view(), name='tasks'),

]