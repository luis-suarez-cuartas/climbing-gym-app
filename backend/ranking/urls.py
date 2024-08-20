from django.urls import path
from .views import UserRankingsView, MostTrainingsView, MostClimbedRoutesView, TotalTrainingTimeView,  MostPopularPublicationsView,  MostLikesView

urlpatterns = [
      path('user-rankings/', UserRankingsView.as_view(), name='user-rankings'),
      path('most-trainings/', MostTrainingsView.as_view(), name='most-trainings'),
      path('most-climbed-routes/', MostClimbedRoutesView.as_view(), name='most-climbed-routes'),
      path('total-training-time/', TotalTrainingTimeView.as_view(), name='total-training-time'),
      path('most-popular-publications/', MostPopularPublicationsView.as_view(), name='most-popular-publications'),
      path('most-likes/', MostLikesView.as_view(), name='most-likes'),

]
