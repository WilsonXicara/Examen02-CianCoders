"""
Circle user managers.
"""
# Django
from django.contrib.auth import models
# Utilities
import random
from string import ascii_lowercase, ascii_uppercase, digits

class UserManager(models.UserManager):
    """
    User manager.

    Used to handle code creeation.
    """
    CODE_LENGTH = 20
    def _create_user(self, username, email, password, **extra_fields):
        if not username:
            raise ValueError('The given username must be set')
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        # Se genera un código único para el nuevo registro
        pool = ascii_lowercase + ascii_uppercase + digits
        code = ''.join(random.choices(pool, k=self.CODE_LENGTH))
        while self.filter(code=code).exists():
            code = ''.join(random.choices(pool, k=self.CODE_LENGTH))
        extra_fields['is_superuser'] = True
        extra_fields['code'] = code
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
