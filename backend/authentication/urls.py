
from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserProfileView, EditProfileView, ChangePasswordView, DeleteAccountView,  AdminLoginView, AdminRegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/edit/', EditProfileView.as_view(), name='edit-profile'),
    path('profile/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin/register/', AdminRegisterView.as_view(), name='admin-register'),
]
