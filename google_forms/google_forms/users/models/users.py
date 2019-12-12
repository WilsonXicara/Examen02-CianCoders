"""
User model.
"""
# Django
from django.db import models
from django.contrib.auth.models import AbstractUser
# Utilities
from google_forms.utils.models import GoogleFormAbstractBaseModel
# Managers
from google_forms.users.managers import UserManager

class User(GoogleFormAbstractBaseModel, AbstractUser):
    """
    User model.

    Extend from Django's Abstract User, change de username field
    to email and add some extra fields.
    """
    code = models.CharField(
        'unique code for user',
        unique=True,
        max_length=20
    )
    email = models.EmailField(
        'email address',
        unique=True,
        error_messages={
            'unique': 'A user with than email alredy exists.'       # Mensaje de error en la creación de un registro
        }
    )
    # Redefiniendo el campo principal
    USERNAME_FIELD = 'email'
    # Campos indispensables para crear un usuario (no es necesario indicar 'email' porque está configurado como 'unique' y por tanto es requerido)
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    # Sobreescribiendo el Manager por defecto (que genera el código único de forma automática)
    objects = UserManager()

    def __str__(self):
        """
        Return username.
        """
        return self.username
    
    def get_short_name(self):
        """
        Return username.
        """
        return self.username
