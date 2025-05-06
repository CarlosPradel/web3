from django.db import models
from django.contrib.auth.models import User
from banco.models.cuenta import Cuenta

class Beneficiario(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mis_beneficiarios')
    beneficiario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='soy_beneficiario')
    cuenta_destino = models.ForeignKey(Cuenta, on_delete=models.CASCADE, related_name="cuentas_beneficiario")

    def __str__(self):
        return f"{self.beneficiario.username} ({self.cuenta_destino.numero_cuenta})"
