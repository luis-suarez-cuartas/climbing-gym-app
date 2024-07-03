from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TrainingViewSet, ClimbedRouteViewSet

router = DefaultRouter()
router.register(r'trainings', TrainingViewSet)
router.register(r'routes', ClimbedRouteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]