from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Publication
from .serializers import PublicationSerializer
from training.models import Training

class CreatePublicationView(generics.CreateAPIView):
    serializer_class = PublicationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        training_id = request.data.get('training_id')
        is_public = request.data.get('is_public', True)  # Obtener el estado de visibilidad
        try:
            training = Training.objects.get(id=training_id, user=request.user)
            if training.loaded:
                return Response({"detail": "Training already loaded"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Convertir is_public a booleano si es necesario
            is_public = bool(is_public)
            
            publication = Publication.objects.create(user=request.user, training=training, is_public=is_public)
            training.loaded = True
            training.save()
            serializer = self.get_serializer(publication)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Training.DoesNotExist:
            return Response({"detail": "Training not found"}, status=status.HTTP_404_NOT_FOUND)



class PublicPublicationListView(generics.ListAPIView):
    serializer_class = PublicationSerializer
    permission_classes = [IsAuthenticated]  # Requiere autenticación

    def get_queryset(self):
        return Publication.objects.filter(is_public=True).order_by('-created_at')