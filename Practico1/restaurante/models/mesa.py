from django.db import models

class Mesa(models.Model):
    numero = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return f"Mesa {self.numero}"
