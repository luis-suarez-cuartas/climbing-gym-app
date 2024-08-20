from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Sum
from rest_framework.views import APIView
from .models import Training, ClimbedRouteTrainingSession, ClimbedRoute
from .serializers import TrainingSerializer, ClimbedRouteSerializer
from collections import Counter
from authentication.views import IsAdminUser 
from authentication.models import CustomUser
from authentication.views import IsAdminUser 

class UnloadedTrainingListView(generics.ListAPIView):
    serializer_class = TrainingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        print(f"Authenticated user: {user.email}")
        queryset = Training.objects.filter(user=user, loaded=False)
        print(f"Queryset for unloaded trainings: {queryset}")
        return queryset


class UpdateTrainingView(generics.UpdateAPIView):
    serializer_class = TrainingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Training.objects.filter(user=self.request.user)
    

class TrainingStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        now = timezone.now()
        
        # This week
        start_of_week = now - timezone.timedelta(days=now.weekday())
        trainings_this_week = Training.objects.filter(user=user, date__gte=start_of_week)
        routes_this_week = ClimbedRouteTrainingSession.objects.filter(training_session__in=trainings_this_week)
        duration_this_week = trainings_this_week.aggregate(Sum('duration'))['duration__sum'] or 0

        # This month
        start_of_month = now.replace(day=1)
        trainings_this_month = Training.objects.filter(user=user, date__gte=start_of_month)
        routes_this_month = ClimbedRouteTrainingSession.objects.filter(training_session__in=trainings_this_month)
        duration_this_month = trainings_this_month.aggregate(Sum('duration'))['duration__sum'] or 0

        # Total
        trainings_total = Training.objects.filter(user=user)
        routes_total = ClimbedRouteTrainingSession.objects.filter(training_session__in=trainings_total)
        duration_total = trainings_total.aggregate(Sum('duration'))['duration__sum'] or 0
        
        grade_counter = Counter(route.climbed_route.grade for route in routes_total)
        routes_total_count = routes_total.count()
        grade_percentages = {
            grade: (count / routes_total_count) * 100 for grade, count in grade_counter.items()
        }

        data = {
            'this_week': {
                'trainings': trainings_this_week.count(),
                'routes': routes_this_week.count(),
                'duration': duration_this_week,
            },
            'this_month': {
                'trainings': trainings_this_month.count(),
                'routes': routes_this_month.count(),
                'duration': duration_this_month,
            },
            'total': {
                'trainings': trainings_total.count(),
                'routes': routes_total.count(),
                'duration': duration_total,
            },
            'grade_percentages': grade_percentages  # Add grade percentages to the response

            
        }
        return Response(data)
 
class TrainingDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, training_id):
        training = get_object_or_404(Training, id=training_id)
        routes = ClimbedRouteTrainingSession.objects.filter(training_session=training)
        total_time_climbed = routes.aggregate(Sum('time_taken'))['time_taken__sum'] or 0
        routes_count = routes.count()

        # Calcular porcentajes de grados
        grade_counter = Counter(route.climbed_route.grade for route in routes)
        grade_percentages = {
            grade: (count / routes_count) * 100 for grade, count in grade_counter.items()
        }

        # Preparar datos para el frontend
        route_data = [
            {
                'route_name': route.climbed_route.route_name,
                'time_taken': route.time_taken,
                'fells': route.fells,
                'completed': route.completed,
            }
            for route in routes
        ]

        data = {
            'user_name': training.user.name,
            'activity_date': training.date.strftime('%d de %B de %Y a las %H:%M'),
            'activity_title': training.name,
            'total_time_climbed': total_time_climbed,
            'routes_count': routes_count,
            'routes': route_data,
            'grade_percentages': grade_percentages,  # Añadir el porcentaje de grados al JSON de respuesta
        }

        return Response(data)


class WeeklyClimbingTimeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        now = timezone.now()

        weekly_data = []
        for week in range(8):
            start_of_week = now - timezone.timedelta(weeks=week+1)
            end_of_week = now - timezone.timedelta(weeks=week)
            trainings = Training.objects.filter(user=user, date__gte=start_of_week, date__lt=end_of_week)
            total_time = ClimbedRouteTrainingSession.objects.filter(training_session__in=trainings).aggregate(Sum('time_taken'))['time_taken__sum'] or 0
            weekly_data.append({
                'week_start': start_of_week.strftime('%Y-%m-%d'),
                'week_end': end_of_week.strftime('%Y-%m-%d'),
                'total_time': total_time
            })

        weekly_data.reverse()  # Reverses the list so the most recent week is last
        return Response(weekly_data)
    


class AdminUserTrainingStatsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, user_id):
        # Obtén el usuario en función del ID de manera consistente
        user = get_object_or_404(CustomUser, id=user_id)
        
        # Calcula las estadísticas del usuario
        trainings = Training.objects.filter(user=user)
        total_trainings = trainings.count()
        total_routes = ClimbedRouteTrainingSession.objects.filter(training_session__in=trainings).count()
        total_duration = trainings.aggregate(Sum('duration'))['duration__sum'] or 0

        # Serializa y retorna los datos
        data = {
            'user_name': user.name,
            'total_trainings': total_trainings,
            'total_routes': total_routes,
            'total_duration': total_duration,
        }
        return Response(data)
    


class AdminAddClimbedRouteView(generics.CreateAPIView):
    queryset = ClimbedRoute.objects.all()
    serializer_class = ClimbedRouteSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]



class RoutePercentageView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        # Get all climbed routes data
        all_sessions = ClimbedRouteTrainingSession.objects.all()

        # Count how many times each route has been climbed
        route_counts = Counter([session.climbed_route.route_name for session in all_sessions])
        total_climbs = sum(route_counts.values())

        # Calculate the percentage for each route
        route_percentages = {
            route: (count / total_climbs) * 100 for route, count in route_counts.items()
        }

        return Response(route_percentages)