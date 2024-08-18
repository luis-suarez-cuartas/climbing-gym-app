import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count
from training.models import Training, ClimbedRouteTrainingSession
from .models import UserRanking
from .serializers import UserRankingSerializer

logger = logging.getLogger(__name__)

import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count
from training.models import Training, ClimbedRouteTrainingSession
from .models import UserRanking
from .serializers import UserRankingSerializer

logger = logging.getLogger(__name__)

class UserRankingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Recorre todos los usuarios para calcular sus estadísticas de escalada
        users = request.user.__class__.objects.all()

        for user in users:
            total_time_climbed = Training.objects.filter(user=user).aggregate(Sum('duration'))['duration__sum'] or 0
            total_routes_climbed = ClimbedRouteTrainingSession.objects.filter(training_session__user=user, completed=True).count()

            # Log the calculated values
            logger.info(f"User: {user.name}, Time Climbed: {total_time_climbed}, Routes Climbed: {total_routes_climbed}")

            # Actualiza o crea el UserRanking para este usuario
            ranking, created = UserRanking.objects.update_or_create(
                user=user,
                defaults={
                    'total_time_climbed': total_time_climbed,
                    'total_routes_climbed': total_routes_climbed
                }
            )
        
        # Actualizar posiciones
        self.update_positions()

        # Serializar y devolver los rankings
        rankings = UserRanking.objects.all()
        serializer = UserRankingSerializer(rankings, many=True)

        # Log the serialized data
        logger.info(f"Serialized Rankings: {serializer.data}")

        return Response(serializer.data)

    def update_positions(self):
        # Actualizar posiciones para el ranking de tiempo escalado
        time_rankings = UserRanking.objects.order_by('-total_time_climbed')
        for index, ranking in enumerate(time_rankings):
            ranking.time_climbing_position = index + 1
            ranking.save()

        # Actualizar posiciones para el ranking de rutas escaladas
        route_rankings = UserRanking.objects.order_by('-total_routes_climbed')
        for index, ranking in enumerate(route_rankings):
            ranking.routes_climbed_position = index + 1
            ranking.save()
