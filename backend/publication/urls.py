from django.urls import path
from .views import CreatePublicationView

urlpatterns = [
    path('create/', CreatePublicationView.as_view(), name='create_publication'),
]
