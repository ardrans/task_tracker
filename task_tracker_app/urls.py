from django.urls import path
from .views import RegisterView, TaskListView, ScreenshotUploadView, TaskCreateView,UserProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('tasks/', TaskListView.as_view(), name='tasks'),
    path('createtasks/', TaskCreateView.as_view(), name='task-create'),
    path('user-profile/', UserProfileView.as_view(), name='user_profile'),
    path('upload/', ScreenshotUploadView.as_view(), name='upload_screenshot'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]