from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from practico3and4.models.libro import Libro
from practico3and4.models.genero import Genero
from practico3and4.models.compra import Compra
from django.contrib.auth import get_user_model

from ..serializers import LibroSerializer, GeneroSerializer, CompraSerializer, UsuarioSerializer

Usuario = get_user_model()


class AdminLibroViewSet(ModelViewSet):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer
    permission_classes = [IsAuthenticated]


class AdminGeneroViewSet(ModelViewSet):
    queryset = Genero.objects.all()
    serializer_class = GeneroSerializer
    permission_classes = [IsAuthenticated]


class VentasViewSet(ReadOnlyModelViewSet):
    queryset = Compra.objects.all().order_by('-fecha')
    serializer_class = CompraSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'], url_path='confirmar')
    def confirmar(self, request, pk=None):
        try:
            compra = self.get_object()
            compra.confirmada = True
            compra.save()
            return Response({'mensaje': 'Venta confirmada correctamente'}, status=status.HTTP_200_OK)
        except Compra.DoesNotExist:
            return Response({'error': 'Compra no encontrada'}, status=status.HTTP_404_NOT_FOUND)


class UsuarioViewSet(ReadOnlyModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]
