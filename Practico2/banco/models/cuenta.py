from django.db import models
from django.contrib.auth.models import User
import uuid

class Cuenta(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    numero_cuenta = models.CharField(max_length=100, unique=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cuentas")
    saldo = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.id} - {self.usuario.username}"
