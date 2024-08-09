# trainning/views.py
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Sum
from rest_framework.views import APIView
from .models import Training, ClimbedRouteTrainingSession
from .serializers import TrainingSerializer

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
            }
        }

        return Response(data)