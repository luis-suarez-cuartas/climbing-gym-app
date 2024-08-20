from django.urls import path
from .views import CreatePublicationView, PublicPublicationListView, UserPublicationListView, LikePublicationView,  AdminUserPublicationListView, AdminAllPublicationsListView, AdminDeletePublicationView, DeleteUserPublicationView

urlpatterns = [
    path('create/', CreatePublicationView.as_view(), name='create_publication'),
    path('public/', PublicPublicationListView.as_view(), name='public_publications'),
    path('user/', UserPublicationListView.as_view(), name='user-publications'),
    path('<int:pk>/like/', LikePublicationView.as_view(), name='like-publication'),
    path('admin/users/<int:user_id>/publications/', AdminUserPublicationListView.as_view(), name='admin-user-publications'),
    path('admin/publications/', AdminAllPublicationsListView.as_view(), name='admin-all-publications'),
    path('admin/publications/<int:pk>/delete/', AdminDeletePublicationView.as_view(), name='admin-delete-publication'),
    path('user/publications/<int:pk>/delete/', DeleteUserPublicationView.as_view(), name='delete_user_publication'),
]

