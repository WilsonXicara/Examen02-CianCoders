"""
Form model.
"""

# Django
from django.db import models
# Utilities
from google_forms.utils.models import GoogleFormBaseModel
# Managers
from google_forms.forms.managers import FormManager

class FormGoogle(GoogleFormBaseModel):
    """
    Form model.
    """
    code = models.CharField(
        'unique code for user',
        unique=True,
        max_length=30
    )
    title = models.TextField(
        max_length=50,
        blank=False
    )
    description = models.TextField(
        max_length=500,
        blank=True
    )
    open_at = models.DateTimeField()
    closed_at = models.DateTimeField(
        null=True   # Si es null entonces el formulario nunca se cerrará
    )
    created_by = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE    # Si User se elimina, se elimina el Form
    )
    # Sobreescribiendo el Manager por defecto (que genera el código único de forma automática)
    objects = FormManager()

    def __str__(self):
        """
        Return form's str representation.
        """
        return self.title

    class Meta(GoogleFormBaseModel.Meta):
        """
        Meta options.
        """
        db_table = 'form_google'