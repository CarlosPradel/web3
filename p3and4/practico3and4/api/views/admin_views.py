from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from practico3and4.models.libro import Libro
from practico3and4.models.genero import Genero
from practico3and4.models.compra import Compra
from django.contrib.auth import get_user_model
from ..serializers import LibroSerializer, GeneroSerializer, CompraSerializer, UsuarioSerializer

Usuario = get_user_model()

# Todos pueden acceder a estos endpoints si están autenticados
class AdminLibroViewSet(ModelViewSet):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer
    permission_classes = [IsAuthenticated]

class AdminGeneroViewSet(ModelViewSet):
    queryset = Genero.objects.all()
    serializer_class = GeneroSerializer
    permission_classes = [IsAuthenticated]

class VentasViewSet(ReadOnlyModelViewSet):
    queryset = Compra.objects.all()
    serializer_class = CompraSerializer
    permission_classes = [IsAuthenticated]

class UsuarioViewSet(ReadOnlyModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]