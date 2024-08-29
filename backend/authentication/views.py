from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .serializers import UserSerializer, MyTokenObtainPairSerializer, AdminTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, BasePermission
from .models import CustomUser  
import logging
from django.shortcuts import get_object_or_404

logger = logging.getLogger(__name__)

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            logger.info(f"New user registered: {user.email}")
            return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = MyTokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            logger.info(f"User logged in: {serializer.validated_data['email']}")
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            logger.info("User logged out")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

# Vista para ver el perfil del usuario
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

# Vista para editar el perfil del usuario
class EditProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        
        # Log para depuración
        logger.info(f"Datos recibidos en la solicitud: {request.data}")

        # Serializar los datos
        serializer = UserSerializer(user, data=request.data, partial=True)  # 'partial=True' permite actualizaciones parciales
        if serializer.is_valid():
            serializer.save()
            logger.info(f"Perfil actualizado: {serializer.data}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            logger.info(f"Errores de validación: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista para cambiar la contraseña del usuario
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not user.check_password(current_password):
            return Response({"detail": "Current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"detail": "New passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"detail": "Password updated successfully"}, status=status.HTTP_200_OK)

# Vista para eliminar la cuenta del usuario
class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        
        # Revocar tokens de refresh
        try:
            refresh_token = request.data.get("refresh_token")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                logger.info(f"Refresh token for user {user.email} blacklisted.")
        except Exception as e:
            logger.error(f"Error revoking token for user {user.email}: {e}")
            return Response({"detail": "Error revoking token."}, status=status.HTTP_400_BAD_REQUEST)

        # Logout (invalidar el token de acceso también podría hacerse aquí si es necesario)

        # Eliminar el usuario
        user_email = user.email  # Guardamos el email para el log
        user.delete()
        logger.info(f"User {user_email} deleted their account.")
        return Response({"detail": "Cuenta eliminada exitosamente"}, status=status.HTTP_204_NO_CONTENT)

# Clase para verificar si el usuario es superusuario
class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser

# Vista específica para superusuarios
class AdminOnlyView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        # Lógica solo accesible para superusuarios
        return Response({"detail": "Contenido solo para superusuarios"}, status=status.HTTP_200_OK)

# Vista para registrar superusuarios
class AdminRegisterView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]  # Solo los superusuarios pueden registrar otros superusuarios

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Crear el superusuario
            user = CustomUser.objects.create_superuser(
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password'],
                name=serializer.validated_data['name'],
                # Otros campos adicionales si los tienes
            )
            logger.info(f"New superuser registered: {user.email}")
            return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista para login de superusuarios
class AdminLoginView(APIView):
    def post(self, request):
        serializer = AdminTokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            logger.info(f"Superuser logged in: {data['email']}")
            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ListUsersView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    


class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def delete(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            user.delete()
            return Response({"detail": "Usuario eliminado exitosamente"}, status=status.HTTP_204_NO_CONTENT)
        except CustomUser.DoesNotExist:
            return Response({"detail": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        

class AdminUserProfileView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id)  
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class AdminChangePasswordView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def put(self, request):
        user = request.user
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not user.check_password(current_password):
            return Response({"detail": "Current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"detail": "New passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"detail": "Password updated successfully"}, status=status.HTTP_200_OK)

class UpdateProfilePictureView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request):
        user = request.user
        profile_picture = request.FILES.get('profile_picture')

        if not profile_picture:
            return Response({"detail": "No profile picture provided"}, status=status.HTTP_400_BAD_REQUEST)

        user.profile_picture = profile_picture
        user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)