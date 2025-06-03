from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    ROL_CHOICES = (
        ('cliente', 'Cliente'),
        ('administrador', 'Administrador'),
    )
    rol = models.CharField(max_length=20, choices=ROL_CHOICES, default='cliente')

    # Email como identificador
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
