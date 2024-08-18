from django.db import models
from django.conf import settings

class UserRanking(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_ranking')
    
    # Ranking basado en tiempo total escalado
    total_time_climbed = models.IntegerField(default=0)  # Tiempo total en segundos o minutos
    time_climbing_position = models.IntegerField(default=0)  # Posición en el ranking de tiempo escalado

    # Ranking basado en número de rutas completadas
    total_routes_climbed = models.IntegerField(default=0)  # Número total de rutas completadas
    routes_climbed_position = models.IntegerField(default=0)  # Posición en el ranking de rutas completadas

    updated_at = models.DateTimeField(auto_now=True)  # Última vez que se actualizó este ranking

    def __str__(self):
        return f"Ranking for {self.user.email} - Time: {self.total_time_climbed}, Routes: {self.total_routes_climbed}"
