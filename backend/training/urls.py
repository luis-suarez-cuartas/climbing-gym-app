# trainning/urls.py
from django.urls import path
from .views import UnloadedTrainingListView, UpdateTrainingView, TrainingStatsView, TrainingDetailView, WeeklyClimbingTimeView, AdminUserTrainingStatsView

urlpatterns = [
    path('unloaded-trainings/', UnloadedTrainingListView.as_view(), name='unloaded-training'),
    path('update-training/<int:pk>/', UpdateTrainingView.as_view(), name='update-training'),
    path('stats/', TrainingStatsView.as_view(), name='training-stats'),
    path('<int:training_id>/details/', TrainingDetailView.as_view(), name='training-detail'),
    path('climbing-time/', WeeklyClimbingTimeView.as_view(), name='climbing-time'),
    path('admin/users/<int:user_id>/stats/', AdminUserTrainingStatsView.as_view(), name='admin-user-stats'),
  
]

