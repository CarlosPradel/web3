from rest_framework import serializers
from practico3and4.models.compra import Compra, DetalleCompra
from .libro import LibroSerializer

class DetalleCompraSerializer(serializers.ModelSerializer):
    libro = LibroSerializer(read_only=True)

    class Meta:
        model = DetalleCompra
        fields = ['id', 'libro', 'precio_unitario']

class CompraSerializer(serializers.ModelSerializer):
    detalles = DetalleCompraSerializer(many=True, read_only=True)
    comprobante_pago = serializers.ImageField(required=False)

    class Meta:
        model = Compra
        fields = ['id', 'usuario', 'fecha', 'total', 'qr_generado', 'comprobante_pago', 'confirmada', 'detalles']
        read_only_fields = ['usuario', 'fecha', 'qr_generado', 'confirmada']
