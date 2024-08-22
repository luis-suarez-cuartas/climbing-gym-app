from django.db import models
from django.conf import settings

class Training(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='entrenamientos')
    name = models.CharField(max_length=100)
    date = models.DateField()
    duration = models.IntegerField(help_text="Duración en minutos")
    notes = models.TextField(blank=True, null=True)
    loaded = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.date}"

class ClimbedRoute(models.Model):
    route_name = models.CharField(max_length=255, default='Unnamed Route')
    grade = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.route_name} - {self.grade}"

class ClimbedRouteTrainingSession(models.Model):
    training_session = models.ForeignKey(Training, on_delete=models.CASCADE)
    climbed_route = models.ForeignKey(ClimbedRoute, on_delete=models.CASCADE)
    fells = models.IntegerField(default=0)
    time_taken = models.IntegerField(help_text="Tiempo en segundos")
    completed = models.BooleanField(default=False)
    timeSection_1 = models.IntegerField(default=0)
    timeSection_2 = models.IntegerField(default=0)
    timeSection_3 = models.IntegerField(default=0)
    timeSection_4 = models.IntegerField(default=0)
    date = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.training_session.name} - {self.climbed_route.route_name}"
