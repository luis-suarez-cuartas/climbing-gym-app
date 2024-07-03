from django.contrib import admin
from .models import Training, ClimbedRoute

class ClimbedRouteInline(admin.TabularInline):
    model = ClimbedRoute
    extra = 1

class TrainingAdmin(admin.ModelAdmin):
    inlines = [ClimbedRouteInline]

admin.site.register(Training, TrainingAdmin)
admin.site.register(ClimbedRoute)
