from django.urls import path
from .views import CreatePublicationView, PublicPublicationListView, UserPublicationListView, LikePublicationView,  AdminUserPublicationListView

urlpatterns = [
    path('create/', CreatePublicationView.as_view(), name='create_publication'),
    path('public/', PublicPublicationListView.as_view(), name='public_publications'),
    path('user/', UserPublicationListView.as_view(), name='user-publications'),
    path('<int:pk>/like/', LikePublicationView.as_view(), name='like-publication'),
    path('admin/users/<int:user_id>/publications/', AdminUserPublicationListView.as_view(), name='admin-user-publications'),
    
]

