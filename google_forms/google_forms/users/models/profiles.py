"""
Profile model.
"""

# Django
from django.db import models
# Utilities
from google_forms.utils.models import GoogleFormBaseModel

class Profile(GoogleFormBaseModel):
    """
    Profile model.

    A profile holds a user's public data like biography, picture
    and statistics.
    """
    user = models.OneToOneField(
        'users.User',       # Llave foránea
        on_delete=models.CASCADE    # Si User se elimina, se elimina Profile
    )
    picture = models.ImageField(
        'profile picture',
        upload_to='users/profiles/pictures/',
        blank=True,
        null=True
    )
    biography = models.TextField(
        max_length=500,
        blank=True
    )
    # Stats
    forms_created = models.PositiveIntegerField(
        default=0
    )
    forms_answered = models.PositiveIntegerField(
        default=0
    )

    def __str__(self):
        """
        Return user's str representation.
        """
        return str(self.user)