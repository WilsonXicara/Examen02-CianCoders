"""
Participant to Answered form model.
"""

# Django
from django.db import models
# Utilities
from google_forms.utils.models import GoogleFormBaseModel

class FormParticipant(GoogleFormBaseModel):
    """
    Participant to Answered form model.
    """
    form = models.ForeignKey(
        'forms.FormGoogle',
        on_delete=models.CASCADE
    )
    answered_by = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True
    )
    answered_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        """
        Return form participant's str representation.
        """
        return '#{}: {}'.format(self.circle.slug_name, self.code)
        return 'Form {} aswered by {} at {}'.format(
            self.form,
            self.answered_by,
            self.answered_at
        )

    class Meta(GoogleFormBaseModel.Meta):
        """
        Meta options.
        """
        db_table = 'form_participant'