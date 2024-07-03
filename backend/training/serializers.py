
from rest_framework import serializers
from .models import Training, ClimbedRoute

class ClimbedRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClimbedRoute
        fields = ['id', 'training', 'duration', 'grade', 'route_name']

class TrainingSerializer(serializers.ModelSerializer):
    routes = ClimbedRouteSerializer(many=True)

    class Meta:
        model = Training
        fields = ['id', 'climber', 'start_time', 'end_time', 'total_duration', 'routes', 'notes']

    def create(self, validated_data):
        routes_data = validated_data.pop('routes')
        training = Training.objects.create(**validated_data)
        for route_data in routes_data:
            ClimbedRoute.objects.create(training=training, **route_data)
        return training
