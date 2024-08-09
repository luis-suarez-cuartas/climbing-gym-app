
from rest_framework import serializers
from .models import Publication

class PublicationSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    training_name = serializers.CharField(source='training.name', read_only=True)
    training_id = serializers.IntegerField(source='training.id', read_only=True)  # Añadir training_id
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)

    class Meta:
        model = Publication
        fields = ['id', 'user_name', 'training_name', 'training_id', 'created_at', 'is_public', 'likes_count']
