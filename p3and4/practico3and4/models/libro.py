from django.db import models
from .genero import Genero

class Libro(models.Model):
    titulo = models.CharField(max_length=255)
    autor = models.CharField(max_length=255)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    isbn = models.CharField(max_length=20, unique=True)
    imagen = models.ImageField(upload_to='libros/')
    generos = models.ManyToManyField(Genero)

    def __str__(self):
        return self.titulo
