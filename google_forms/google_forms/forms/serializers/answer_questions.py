"""
Answer to Question form serializers.
"""

# Django REST Framework
from rest_framework import serializers
# Models
from google_forms.forms.models import (
    FormParticipant,
    FormQuestion,
    AnswerQuestion,
)
# Serializers
from google_forms.forms.serializers import FormGoogleModelSerializaer
from google_forms.users.serializers import UserModelSerializaer

class AnswerQuestionModelSerializer(serializers.ModelSerializer):
    """
    Answer to Question form serializer.
    """
    question = serializers.StringRelatedField(many=False)

    class Meta:
        """
        Meta class.
        """
        model = AnswerQuestion
        fields = (
            'id', 'question', 'answer',
        )

class CreateAnswerQuestionModelSerializer(serializers.Serializer):
    """
    Answer to Question form serializer.
    """
    question_id = serializers.IntegerField(required=True)
    answer = serializers.IntegerField(required=True)

    def validate(self, data):
        """
        Validates that there is a question with the specified ID, and that said question belongs to the form.

        @Pendiente. Requires the form to be added to the context.
        """
        question_id = data.get('question_id')
        try:
            # import ipdb; ipdb.set_trace()
            question = FormQuestion.objects.get(pk=question_id, is_active=True, form=self.context['form'])
            self.context['question'] = question
        except FormQuestion.DoesNotExist:
            raise serializers.ValidationError('The question provided does not exist on the form provided')
        return data

    def create(self, validated_data):
        """
        Create a new answer to Form question.
        
        @Pendiente. Requires the form_participant to be added to the context.
        """
        # La validación de que si el formulario está activo debe hacerse fuera de este serializador
        form_participant = self.context['form_participant']
        question = self.context['question']
        validated_data.pop('queestion_id')
        answer = AnswerQuestion.objects.create(
            question=question,
            form_participant=form_participant,
            **validated_data
        )
        return answer
