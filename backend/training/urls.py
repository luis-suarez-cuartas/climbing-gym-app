# trainning/urls.py
from django.urls import path
from .views import UnloadedTrainingListView, UpdateTrainingView

urlpatterns = [
    path('unloaded-trainings/', UnloadedTrainingListView.as_view(), name='unloaded-training-list'),
    path('update-training/<int:pk>/', UpdateTrainingView.as_view(), name='update-training'),
]
