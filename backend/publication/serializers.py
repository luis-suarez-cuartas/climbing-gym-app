
from rest_framework import serializers
from .models import Publication

class PublicationSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    training_name = serializers.CharField(source='training.name', read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)

    class Meta:
        model = Publication
        fields = ['id', 'user_name', 'training_name', 'created_at', 'is_public', 'likes_count']