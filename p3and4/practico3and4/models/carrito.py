from django.db import models
from django.conf import settings
from .libro import Libro

class CarritoItem(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    fecha_agregado = models.DateTimeField(auto_now_add=True)
