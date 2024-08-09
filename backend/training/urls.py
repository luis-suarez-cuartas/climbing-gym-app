# trainning/urls.py
from django.urls import path
from .views import UnloadedTrainingListView, UpdateTrainingView, TrainingStatsView, TrainingDetailView

urlpatterns = [
    path('unloaded-trainings/', UnloadedTrainingListView.as_view(), name='unloaded-training'),
    path('update-training/<int:pk>/', UpdateTrainingView.as_view(), name='update-training'),
    path('stats/', TrainingStatsView.as_view(), name='training-stats'),
    path('<int:training_id>/details/', TrainingDetailView.as_view(), name='training-detail'),
]

