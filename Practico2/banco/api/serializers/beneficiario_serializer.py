from rest_framework import serializers
from banco.models.beneficiario import Beneficiario


class BeneficiarioSerializer(serializers.ModelSerializer):
    beneficiario_nombre = serializers.CharField(source='beneficiario.username', read_only=True)
    numero_cuenta = serializers.CharField(source='cuenta_destino.numero_cuenta', read_only=True)
    cuenta_destino_id = serializers.UUIDField(source='cuenta_destino.id', read_only=True)

    class Meta:
        model = Beneficiario
        fields = ['id', 'beneficiario', 'cuenta_destino', 'beneficiario_nombre', 'numero_cuenta', 'cuenta_destino_id']
        extra_kwargs = {
            'beneficiario': {'write_only': True},
            'cuenta_destino': {'write_only': True},
        }
