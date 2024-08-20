import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count
from training.models import Training, ClimbedRouteTrainingSession
from .models import UserRanking
from .serializers import UserRankingSerializer
from authentication.views import IsAdminUser 
from training.models import ClimbedRoute
from publication.models import Publication
from authentication.models import CustomUser

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



class MostTrainingsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        try:
            # Anotar el número de entrenamientos asociados con cada usuario
            users = CustomUser.objects.annotate(total_trainings=Count('entrenamientos')).order_by('-total_trainings')
            data = [{'user_name': user.name, 'total_trainings': user.total_trainings} for user in users]
            return Response(data, status=200)
        except Exception as e:
            print(f"Error: {e}")
            return Response({"detail": "An error occurred while fetching the rankings."}, status=500)
        
class MostClimbedRoutesView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        routes = ClimbedRoute.objects.annotate(times_climbed=Count('climbedroutetrainingsession')).order_by('-times_climbed')
        data = [{'route_name': route.route_name, 'times_climbed': route.times_climbed} for route in routes]
        return Response(data)

class TotalTrainingTimeView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        # Aquí usamos el `related_name` `entrenamientos` definido en el modelo `Training`
        users = CustomUser.objects.annotate(total_time_climbed=Sum('entrenamientos__duration')).order_by('-total_time_climbed')
        data = [{'user_name': user.name, 'total_time_climbed': user.total_time_climbed} for user in users]
        return Response(data)


class MostPopularPublicationsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        # Anotamos las publicaciones con el total de interacciones (suma de likes y comentarios)
        publications = Publication.objects.annotate(total_interactions=Count('likes') + Count('comments')).order_by('-total_interactions')
        
        # Cambiamos `title` a `training.name` ya que `title` no existe en el modelo `Publication`
        data = [{'training_name': pub.training.name, 'total_interactions': pub.total_interactions} for pub in publications]
        
        return Response(data)
class MostLikesView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        users = request.user.__class__.objects.annotate(total_likes=Count('publications__likes')).order_by('-total_likes')
        data = [{'user_name': user.name, 'total_likes': user.total_likes} for user in users]
        return Response(data)