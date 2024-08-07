from rest_framework import serializers
from .models import Publication

class PublicationSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    training_name = serializers.CharField(source='training.name', read_only=True)

    class Meta:
        model = Publication
        fields = ['id', 'user_email', 'training_name', 'created_at', 'is_public']
