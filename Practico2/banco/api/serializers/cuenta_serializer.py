from rest_framework import serializers
from banco.models.cuenta import Cuenta
import uuid

class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = ['id', 'numero_cuenta', 'saldo', 'usuario']
        read_only_fields = ['numero_cuenta']  # solo numero_cuenta es autogenerado

    def create(self, validated_data):
        validated_data['numero_cuenta'] = str(uuid.uuid4())
        return super().create(validated_data)
