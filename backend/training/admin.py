from django.contrib import admin
from .models import Training, ClimbedRoute, ClimbedRouteTrainingSession

class ClimbedRouteTrainingSessionInline(admin.TabularInline):
    model = ClimbedRouteTrainingSession

@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    inlines = [ClimbedRouteTrainingSessionInline]
    list_display = ('name', 'user', 'date', 'loaded')
    search_fields = ('name', 'user__email')

@admin.register(ClimbedRoute)
class ClimbedRouteAdmin(admin.ModelAdmin):
    list_display = ('route_name', 'grade')
    search_fields = ('route_name',)

@admin.register(ClimbedRouteTrainingSession)
class ClimbedRouteTrainingSessionAdmin(admin.ModelAdmin):
    list_display = ('training_session', 'climbed_route', 'time_taken', 'completed')
    search_fields = ('training_session__name', 'climbed_route__route_name')
