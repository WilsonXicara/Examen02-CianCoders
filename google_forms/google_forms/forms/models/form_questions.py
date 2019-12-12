"""
Form question model.
"""

# Django
from django.db import models
# Utilities
from google_forms.utils.models import GoogleFormBaseModel

class FormQuestion(GoogleFormBaseModel):
    """
    Form question model.
    """
    question = models.TextField(
        max_length=100,
        blank=False
    )
    description_help = models.TextField(
        max_length=150,
        blank=True
    )
    form = models.ForeignKey(
        'forms.FormGoogle',
        on_delete=models.CASCADE,
        related_name='questions'
    )

    def __str__(self):
        """
        Return form question's str representation.
        """
        return self.question

    class Meta(GoogleFormBaseModel.Meta):
        """
        Meta options.
        """
        db_table = 'form_question'
        ordering = ['created',]