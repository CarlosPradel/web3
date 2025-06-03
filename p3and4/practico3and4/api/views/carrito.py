from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from practico3and4.models.carrito import CarritoItem
from ..serializers import CarritoItemSerializer

class CarritoViewSet(ModelViewSet):
    serializer_class = CarritoItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CarritoItem.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)