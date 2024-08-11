from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from authentication.models import CustomUser  # Asegúrate de que el import usa el nombre correcto de tu app

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'profile_picture','name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Asigna una foto de perfil por defecto
        default_profile_picture = 'profile_pictures/default_profile.jpg'  # Ruta relativa a MEDIA_ROOT
        user = CustomUser.objects.create_user(
            **validated_data,
            profile_picture=default_profile_picture
        )
        return user

class MyTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(email=attrs['email'], password=attrs['password'])
        if user:
            refresh = RefreshToken.for_user(user)
            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'name': user.name,
                'email': user.email
            }
        raise serializers.ValidationError('Unable to log in with provided credentials.')
