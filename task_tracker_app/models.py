from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
# Custom User Model
class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_groups",
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",
        blank=True,
    )

    def __str__(self):
        return self.username

# Task Model
class Task(models.Model):
    app_name = models.CharField(max_length=255)
    points = models.PositiveIntegerField()  # Ensures that only positive integers are allowed
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")

    def __str__(self):
        return self.app_name

# Screenshot Upload
class Screenshot(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="screenshots")
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="uploaded_screenshots")
    image = models.ImageField(upload_to='screenshots/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Screenshot for {self.task.app_name} by {self.uploaded_by.username}"
