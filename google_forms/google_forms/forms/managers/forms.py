"""
Form managers.
"""
# Django
from django.db import models
# Utilities
import random
from string import ascii_lowercase, ascii_uppercase, digits

class FormManager(models.Manager):
    """
    Form managers.

    Used to handle code creeation.
    """
    CODE_LENGTH = 30

    def create(self, **kwargs):
        """
        Handle code creation.
        """
        # Se garantiza la creación de un código único
        pool = ascii_lowercase + ascii_uppercase + digits
        code = ''.join(random.choices(pool, k=self.CODE_LENGTH))
        while self.filter(code=code).exists():
            code = ''.join(random.choices(pool, k=self.CODE_LENGTH))
        kwargs['code'] = code
        return super(FormManager, self).create(**kwargs)