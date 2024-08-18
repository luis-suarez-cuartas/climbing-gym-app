from rest_framework import serializers
from .models import UserRanking

class UserRankingSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name')
    image = serializers.ImageField(source='user.profile_picture', read_only=True)
    total_time_climbed = serializers.IntegerField()
    total_routes_climbed = serializers.IntegerField()
    time_climbing_position = serializers.IntegerField()
    routes_climbed_position = serializers.IntegerField()

    class Meta:
        model = UserRanking
        fields = [
            'user_name',
            'image',
            'total_time_climbed',
            'total_routes_climbed',
            'time_climbing_position',
            'routes_climbed_position'
        ]
