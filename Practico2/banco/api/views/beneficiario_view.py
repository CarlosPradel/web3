from rest_framework import viewsets, permissions
from banco.models.beneficiario import Beneficiario
from banco.api.serializers import BeneficiarioSerializer

class BeneficiarioViewSet(viewsets.ModelViewSet):
    serializer_class = BeneficiarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Beneficiario.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
