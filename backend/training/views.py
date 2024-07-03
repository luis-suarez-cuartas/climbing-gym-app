from django.shortcuts import render
from rest_framework import viewsets
from .models import Training, ClimbedRoute
from .serializers import TrainingSerializer, ClimbedRouteSerializer

class TrainingViewSet(viewsets.ModelViewSet):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer

class ClimbedRouteViewSet(viewsets.ModelViewSet):
    queryset = ClimbedRoute.objects.all()
    serializer_class = ClimbedRouteSerializer

