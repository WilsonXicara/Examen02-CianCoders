"""
Participant to Answered form serializers.
"""

# Django REST Framework
from rest_framework import serializers
# Models
from google_forms.forms.models import FormParticipant, FormQuestion, AnswerQuestion
# Serializers
from google_forms.forms.serializers import (
    CreateAnswerQuestionModelSerializer,
    FormGoogleFullModelSerializaer
)
from google_forms.users.serializers import UserModelSerializaer
# Utilities
from django.utils import timezone

class FormParticipantModelSerializer(serializers.ModelSerializer):
    """
    Participant to Answered form serializer.
    """
    form = FormGoogleFullModelSerializaer(many=False)

    class Meta:
        """
        Meta class.
        """
        model = FormParticipant
        fields = (
            'id', 'form', 'answered_at',
        )

class FormParticipantFullModelSerializer(serializers.ModelSerializer):
    """
    Participant to Answered form serializer.
    """
    form = FormGoogleFullModelSerializaer(many=False)
    answered_by = UserModelSerializaer(many=False)

    class Meta:
        """
        Meta class.
        """
        model = FormParticipant
        fields = (
            'id', 'form', 'answered_by', 'answered_at',
        )

class CreateParticipationFormSerializaer(serializers.Serializer):
    """
    Create participation in Form Google serializer.
    """
    # Importante.
    # Este campo no está definido en el modelo maestro pero sí en el modelo detalle
    # (AnswerQuestion). Por lo tanto, este campo debe llamarse
    # como se definió en el 'related_name' del modelo detalle
    answers = CreateAnswerQuestionModelSerializer(many=True)

    # class Meta:
    #     """
    #     Meta class.
    #     """
    #     model = FormParticipant
    #     fields = (
    #         'form', 'answered_by', 'answered_at',
    #     )

    def create(self, validated_data):
        """
        Create a set of answers for the form provided.
        Validates that the current time is between the activity time of the form.

        Requires the form to be included in the context
        """
        form = self.context['form']
        # Se valida que se proporcione respuestas para cada una de las preguntas del formulario.
        # Para ello se hará lo siguiente:
        # - Si para el FormQuestionModelSerializer quiere decir que todas las respuestas son de preguntas
        #   del formulario. Entonces, si la cantidad de elementos en dicho serializador es menor a la cantidad
        #   de preguntas del formulario se concluye que faltan respuestas a por lo menos una pregunta.
        answers = validated_data.pop('answers')
        count_answers = len(answers)
        count_questions = FormQuestion.objects.filter(is_active=True, form=form).count()
        if count_answers != count_questions:
            raise serializers.ValidationError(
                'The form has {} question{} but only {} answer{} were provided'.format(
                    count_questions,
                    '' if count_questions == 1 else 's',
                    count_answers,
                    '' if count_answers == 1 else 's',
                )
            )
        # Se crea el registro de participación
        now = timezone.now()
        form_participation = FormParticipant.objects.create(
            form=form,
            answered_by=self.context['request'].user,
            answered_at=now
        )
        # self.context['form_participant'] = form_participation
        # self.form_participant = form_participation
        # Se crean todas las respuestas. Ya se ha validado que cada pregunta existe
        # context = {
        #     form: form,
        #     form_participant: form_participation
        # }
        for answer in answers:
            AnswerQuestion.objects.create(
                form_participant=form_participation,
                question=FormQuestion.objects.get(pk=answer.get('question_id')),
                **answer
            )
            # serializer = CreateAnswerQuestionModelSerializer(
            #     data=answer,
            #     # context=context
            # )
            # serializers.is_valid(raise_exception=True)
            # serializers.save()
        return form_participation
