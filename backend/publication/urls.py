from django.urls import path
from .views import CreatePublicationView, PublicPublicationListView

urlpatterns = [
    path('create/', CreatePublicationView.as_view(), name='create_publication'),
    path('public/', PublicPublicationListView.as_view(), name='public_publications'),
]
