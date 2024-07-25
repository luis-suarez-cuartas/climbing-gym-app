from rest_framework import serializers
from .models import Training, ClimbedRoute

class ViaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClimbedRoute
        fields = '__all__'

class EntrenamientoSerializer(serializers.ModelSerializer):
    vias = ViaSerializer(many=True, read_only=True)

    class Meta:
        model = Training
        fields = '__all__'

    def create(self, validated_data):
        vias_data = validated_data.pop('vias')
        entrenamiento = Training.objects.create(**validated_data)
        for via_data in vias_data:
            ClimbedRoute.objects.create(training_session=entrenamiento, **via_data)
        return entrenamiento
