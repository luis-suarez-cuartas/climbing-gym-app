from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from authentication.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id','email', 'password', 'profile_picture', 'name')
        extra_kwargs = {
            'password': {'write_only': True},
            'profile_picture': {'required': False}
        }

    def create(self, validated_data):
        if not validated_data.get('profile_picture'):
            validated_data['profile_picture'] = 'profile_pictures/default_profile.jpg'  
        user = CustomUser.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        if validated_data.get('profile_picture'):
            instance.profile_picture = validated_data['profile_picture']
        instance.save()
        return instance


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


class AdminTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(email=attrs['email'], password=attrs['password'])
        if user and user.is_superuser:
            refresh = RefreshToken.for_user(user)
            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'name': user.name,
                'email': user.email,
                'is_superuser': user.is_superuser,
                'is_staff': user.is_staff
            }
        raise serializers.ValidationError('Unable to log in with provided credentials.')
