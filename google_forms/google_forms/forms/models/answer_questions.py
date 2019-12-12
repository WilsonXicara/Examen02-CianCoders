"""
Answer to Question model.
"""

# Django
from django.db import models
# Utilities
from google_forms.utils.models import GoogleFormBaseModel

class AnswerQuestion(GoogleFormBaseModel):
    """
    Answer to Question model.
    """
    answer = models.IntegerField()
    question = models.ForeignKey(
        'forms.FormQuestion',
        on_delete=models.CASCADE,
        related_name='answers'
    )
    form_participant = models.ForeignKey(
        'forms.FormParticipant',
        on_delete=models.CASCADE,
        related_name='participations'
    )

    def __str__(self):
        """
        Return answer question's str representation.
        """
        return '{} => {}'.format(
            self.question,
            self.answer
        )

    class Meta(GoogleFormBaseModel.Meta):
        """
        Meta options.
        """
        db_table = 'answer_question'