from django.urls import path
from .views import UserRankingsView

urlpatterns = [
      path('user-rankings/', UserRankingsView.as_view(), name='user-rankings'),
]
