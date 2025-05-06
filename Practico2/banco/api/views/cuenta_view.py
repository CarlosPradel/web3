from rest_framework import viewsets, permissions
from banco.models.cuenta import Cuenta
from banco.api.serializers import CuentaSerializer

class CuentaViewSet(viewsets.ModelViewSet):
    serializer_class = CuentaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cuenta.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
