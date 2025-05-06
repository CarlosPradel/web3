from django.db import models
from .cuenta import Cuenta

TIPOS_MOVIMIENTO = [
    ("ingreso", "Ingreso"),
    ("egreso", "Egreso"),
    ("transferencia", "Transferencia"),
]

class Movimiento(models.Model):
    tipo = models.CharField(max_length=15, choices=TIPOS_MOVIMIENTO)
    cuenta_origen = models.ForeignKey(Cuenta, on_delete=models.CASCADE, related_name="movimientos_salida", null=True, blank=True)
    cuenta_destino = models.ForeignKey(Cuenta, on_delete=models.CASCADE, related_name="movimientos_entrada", null=True, blank=True)
    monto = models.DecimalField(max_digits=12, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tipo} - {self.monto} ({self.fecha})"
