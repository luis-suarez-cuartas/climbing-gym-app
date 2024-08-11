from rest_framework import serializers
from django.db.models import Count, Sum
from collections import Counter
from .models import Training, ClimbedRouteTrainingSession

class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Training
        fields = '__all__'

class ClimbedRouteTrainingSessionSerializer(serializers.ModelSerializer):
    route_name = serializers.CharField(source='climbed_route.route_name')
    grade = serializers.CharField(source='climbed_route.grade')
    class Meta:
        model = ClimbedRouteTrainingSession
        fields = ['route_name', 'grade', 'time_taken', 'fells', 'completed']


class TrainingDetailSerializer(serializers.ModelSerializer):
    routes = ClimbedRouteTrainingSessionSerializer(many=True)
    user_name = serializers.CharField(source='user.name', read_only=True)
    activity_date = serializers.DateTimeField(source='date', format='%d de %B de %Y a las %H:%M')
    total_time_climbed = serializers.SerializerMethodField()
    routes_count = serializers.SerializerMethodField()
    grade_percentages = serializers.SerializerMethodField()
    
    class Meta:
        model = Training
        fields = [
            'user_name',
            'activity_date',
            'activity_title',
            'total_time_climbed',
            'routes_count',
            'routes',
            'grade_percentages',
        ]

    def get_total_time_climbed(self, obj):
        return obj.climbedroutetrainingsession_set.aggregate(Sum('time_taken'))['time_taken__sum'] or 0

    def get_routes_count(self, obj):
        return obj.climbedroutetrainingsession_set.count()
    def get_grade_percentages(self, obj):
        # Calcular el porcentaje de cada grado basado en el queryset
        routes = obj.climbedroutetrainingsession_set.all()
        routes_count = routes.count()
        grade_counter = Counter(route.climbed_route.grade for route in routes)
        grade_percentages = {
            grade: (count / routes_count) * 100 for grade, count in grade_counter.items()
        }
        return grade_percentages