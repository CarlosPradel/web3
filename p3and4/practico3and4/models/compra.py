from django.db import models
from django.conf import settings
from .libro import Libro

class Compra(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    qr_generado = models.CharField(max_length=255)
    comprobante_pago = models.ImageField(upload_to='comprobantes/', null=True, blank=True)
    confirmada = models.BooleanField(default=False)

class DetalleCompra(models.Model):
    compra = models.ForeignKey(Compra, related_name='detalles', on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    precio_unitario = models.DecimalField(max_digits=8, decimal_places=2)
