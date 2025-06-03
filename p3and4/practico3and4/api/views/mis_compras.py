from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from practico3and4.models.compra import Compra
from ..serializers import CompraSerializer

class MisComprasViewSet(ReadOnlyModelViewSet):
    serializer_class = CompraSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Compra.objects.filter(usuario=self.request.user)