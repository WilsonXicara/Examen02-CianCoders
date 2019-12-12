"""
Form Google serializers.
"""
# Django REST Framework
from rest_framework import serializers
# Models
from google_forms.forms.models import (
    FormGoogle,
    FormQuestion,
    FormParticipant,
)
# Serializers
from google_forms.forms.serializers import FormQuestionModelSerializer
from google_forms.users.serializers import UserModelSerializaer
# Utilities
from datetime import timedelta
from django.utils import timezone

class FormGoogleModelSerializaer(serializers.ModelSerializer):
    """
    Form Google serializer.
    """

    class Meta:
        """
        Meta class.
        """
        model = FormGoogle
        fields = (
            'code', 'title', 'description',
            'open_at', 'closed_at',
        )
        read_only_fields = (
            'code',
        )

class UpdateFormGoogleModelSerializaer(serializers.ModelSerializer):
    """
    Upate Form Google serializer.
    """
    title = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=500)
    open_at = serializers.DateTimeField(required=False)
    closed_at = serializers.DateTimeField(required=False, allow_null=True)
    
    class Meta:
        """
        Meta class.
        """
        model = FormGoogle
        fields = (
            'code', 'title', 'description',
            'open_at', 'closed_at',
        )
        read_only_fields = (
            'code',
        )

    def validate_open_at(self, data):
        """
        Validates that:
            + The form has not been answered by any user.
        """
        count_answered = FormParticipant.objects.filter(
            is_active=True,
            form=self.instance
        ).count()
        if count_answered > 0:
            raise serializers.ValidationError(
                'The form already has {} answer{}.'.format(count_answered, '' if count_answered==1 else 's')
            )
        return data

    def update(self, instance, validated_data):
        """
        The form can be updated:
            + If the form is not yet closed (the current datetime is less than its closing datetime).
            + If the closing datetime (if specified) is later than the opening datetime.
        """
        now = timezone.now()
        if instance.closed_at is not None and instance.closed_at <= now:
            raise serializers.ValidationError('The form is already closed at {}.'.format(instance.closed_at))
        open_at = validated_data.get('open_at') or instance.open_at
        closed_at = validated_data.get('closed_at', None)
        if closed_at is not None and closed_at <= open_at:
            raise serializers.ValidationError('The closing datetime of the form must be after its opening datetime.')
        return super(UpdateFormGoogleModelSerializaer, self).update(instance, validated_data)

class CreateFormGoogleSerializaer(serializers.Serializer):
    """
    Create Form Google serializer.
    """
    title = serializers.CharField(
        max_length=50
    )
    description = serializers.CharField(
        max_length=500,
        required=False
    )
    open_at = serializers.DateTimeField(
        required=True
    )
    closed_at = serializers.DateTimeField(
        required=False
    )
    # Importante.
    # Este campo no está definido en el modelo maestro pero sí en el modelo detalle
    # (FormQuestion). Por lo tanto, este campo debe llamarse
    # como se definió en el 'related_name' del modelo detalle
    questions = FormQuestionModelSerializer(many=True)

    def create(self, validated_data):
        """
        Create the new form, provided you have at least one question.
        Validates that:
            + The closing date (if specified) is later than the start date
        """
        closed_at = validated_data.get('closed_at', None)
        if closed_at is not None and closed_at <= validated_data['open_at']:
            raise serializers.ValidationError('The closing datetime of the form must be after the datetime of its opening.')
        questions = validated_data.pop('questions')
        if len(questions) == 0:
            raise serializers.ValidationError('The form must have at least one question')
        # Creación del formulario
        form = FormGoogle.objects.create(
            created_by=self.context['request'].user,
            **validated_data
        )
        # Creación de todas las preguntas
        for question in questions:
            FormQuestion.objects.create(form=form, **question)
        return form

class FormGoogleFullModelSerializaer(serializers.ModelSerializer):
    """
    Form Google serializer.
    """
    created_by = UserModelSerializaer(many=False)
    
    class Meta:
        """
        Meta class.
        """
        model = FormGoogle
        fields = (
            'code', 'title', 'description',
            'open_at', 'closed_at',
            'created_by',
        )
        # Campos que no pueden ser sobreescritos
        read_only_fields = (
            'created_by',
        )
