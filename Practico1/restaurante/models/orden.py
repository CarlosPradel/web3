from django.db import models
from .cliente import Cliente
from .plato import Plato
from .mesero import Mesero
from .mesa import Mesa

class Orden(models.Model):
    ESTADO_CHOICES = (
        ('abierta', 'Abierta'),
        ('cerrada', 'Cerrada'),
    )

    platos = models.ManyToManyField(Plato)
    mesero = models.ForeignKey(Mesero, on_delete=models.SET_NULL, null=True)
    mesa = models.OneToOneField(Mesa, on_delete=models.SET_NULL, null=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True, blank=True)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='abierta')
    fecha_hora = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Orden #{self.id} - {self.estado}"
