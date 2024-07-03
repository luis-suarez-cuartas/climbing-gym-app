
from django.db import models
from authentication.models import CustomUser

class Training(models.Model):
    climber = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    total_duration = models.DurationField(editable=False)
    notes = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        # Calcula la duración total del entrenamiento
        self.total_duration = self.end_time - self.start_time
        super(Training, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.climber.email} - {self.total_duration}"

class ClimbedRoute(models.Model):
    training = models.ForeignKey(Training, related_name="routes", on_delete=models.CASCADE)
    duration = models.DurationField()
    grade = models.CharField(max_length=10)
    route_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.route_name} - {self.grade}"

