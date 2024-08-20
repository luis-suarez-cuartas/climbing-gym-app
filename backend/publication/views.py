from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated,BasePermission
from rest_framework.response import Response
from .models import Publication, Like, Comment
from .serializers import PublicationSerializer
from training.models import Training
from authentication.views import IsAdminUser 
from rest_framework.generics import ListAPIView
from .serializers import CommentSerializer
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
    



class UserPublicationListView(generics.ListAPIView):
    serializer_class = PublicationSerializer
    permission_classes = [IsAuthenticated]  # Requiere autenticación

    def get_queryset(self):
        return Publication.objects.filter(user=self.request.user).order_by('-created_at')
    


class LikePublicationView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        publication_id = kwargs.get('pk')
        user = request.user
        try:
            publication = Publication.objects.get(id=publication_id)
            # Verificar si el usuario ya ha dado like a esta publicación
            like, created = Like.objects.get_or_create(user=user, publication=publication)
            if not created:
                return Response({"detail": "Already liked"}, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({"likes_count": publication.likes.count()}, status=status.HTTP_201_CREATED)
        except Publication.DoesNotExist:
            return Response({"detail": "Publication not found"}, status=status.HTTP_404_NOT_FOUND)
        


class DeleteUserPublicationView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Publication.objects.all()

    def delete(self, request, *args, **kwargs):
        publication_id = self.kwargs['pk']
        try:
            publication = self.get_queryset().get(id=publication_id, user=request.user)
            publication.delete()
            return Response({"detail": "Publication deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Publication.DoesNotExist:
            return Response({"detail": "Publication not found or not owned by user"}, status=status.HTTP_404_NOT_FOUND)

class AdminUserPublicationListView(ListAPIView):
    serializer_class = PublicationSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Publication.objects.filter(user_id=user_id).order_by('-created_at')
    
class AdminAllPublicationsListView(ListAPIView):
    serializer_class = PublicationSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        return Publication.objects.all().order_by('-created_at')
    


class AdminDeletePublicationView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Publication.objects.all()

    def delete(self, request, *args, **kwargs):
        publication_id = self.kwargs['pk']
        try:
            publication = self.get_queryset().get(id=publication_id)
            publication.delete()
            return Response({"detail": "Publication deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Publication.DoesNotExist:
            return Response({"detail": "Publication not found"}, status=status.HTTP_404_NOT_FOUND)
        


class CreateCommentView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        publication_id = kwargs.get('pk')
        user = request.user
        text = request.data.get('text')

        try:
            publication = Publication.objects.get(id=publication_id)
            comment = Comment.objects.create(user=user, publication=publication, text=text)
            serializer = self.get_serializer(comment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Publication.DoesNotExist:
            return Response({"detail": "Publication not found"}, status=status.HTTP_404_NOT_FOUND)