"""
Form question serializers.
"""

# Django REST Framework
from rest_framework import serializers
# Models
from google_forms.forms.models import FormQuestion, FormParticipant
# Utilities
from django.utils import timezone

class FormQuestionModelSerializer(serializers.ModelSerializer):
    """
    Form question serializer.
    """
    
    class Meta:
        """
        Meta class.
        """
        model = FormQuestion
        fields = (
            'id', 'question', 'description_help',
        )

    def create(self, validated_data):
        """
        Create a new Form question if:
            + The form has not been answered by any user.
            + The form is not yet closed (the current datetime is less than its closing datetime).
        """
        form = self.context['form']
        count_answered = FormParticipant.objects.filter(
            is_active=True,
            form=form
        ).count()
        if count_answered > 0:
            raise serializers.ValidationError(
                'The form already has {} answer{}.'.format(count_answered, '' if count_answered==1 else 's')
            )
        now = timezone.now()
        if form.closed_at is not None and form.closed_at <= now:
            raise serializers.ValidationError('The form is already closed')
        question = FormQuestion.objects.create(
            form=form,
            **validated_data
        )
        return question
