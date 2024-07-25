# trainning/views.py
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Training
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
        return Training.objects.filter(user=self.request.user, loaded=False)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
