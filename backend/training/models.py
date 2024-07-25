
from django.db import models
from authentication.models import CustomUser
from django.conf import settings

class Training(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='entrenamientos')
    date = models.DateField()
    duration = models.IntegerField(help_text="Duración en minutos")
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.date}"

class ClimbedRoute(models.Model):
    training_session = models.ForeignKey(Training, related_name='vias', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=10)
    location = models.CharField(max_length=100)
    time_taken = models.IntegerField(help_text="Tiempo en segundos")
    fell = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    attempts = models.IntegerField(default=1)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.difficulty}"
