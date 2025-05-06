from rest_framework import serializers
from banco.models.movimiento import Movimiento

class MovimientoSerializer(serializers.ModelSerializer):
    fecha = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Movimiento
        fields = ['id', 'tipo', 'cuenta_origen', 'cuenta_destino', 'monto', 'fecha']

    def validate_monto(self, value):
        if value <= 0:
            raise serializers.ValidationError("El monto debe ser mayor a 0")
        return value
