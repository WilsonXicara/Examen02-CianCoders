"""
Forms Google ViewSets.
"""
# Django
from django.db.models import Avg, Sum
# Django REST Framework
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
# Models
from google_forms.forms.models import (
    FormGoogle,
    FormQuestion,
    FormParticipant,
    AnswerQuestion,
)
# Serializers
from google_forms.forms.serializers import (
    FormGoogleModelSerializaer,
    FormGoogleFullModelSerializaer,
    CreateFormGoogleSerializaer,
    # 
    FormQuestionModelSerializer,
    UpdateFormGoogleModelSerializaer,
    # 
    FormQuestionModelSerializer,
)
from google_forms.users.serializers import UserSimplifyModelSerializaer
# Permissions
from rest_framework.permissions import IsAuthenticated
from google_forms.forms.permissions import IsFormOwnerPermission
# Utilities
from google_forms.utils.mixins import SoftDestroyModelMixin

class FormGoogleViewSet(mixins.ListModelMixin,
                        mixins.CreateModelMixin,
                        mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        SoftDestroyModelMixin,
                        viewsets.GenericViewSet):
    """
    Form Google ViewSet.
    """
    lookup_field = 'code'

    def get_queryset(self):
        """
        Return active forms's.
        """
        queryset = FormGoogle.objects.filter(is_active=True)
        return queryset

    def get_permissions(self):
        """
        Assign permission based on action.
        """
        permissions = [IsAuthenticated]
        if self.action in ['update', 'patch', 'partial_update', 'destroy', 'participants']:
            # Solo el propietario del formulario puede modificarlo
            permissions.append(IsFormOwnerPermission)
        return [permission() for permission in permissions]

    def get_serializer_class(self):
        """
        Return serializer based on action.
        """
        if self.action == 'create':
            return CreateFormGoogleSerializaer
        if self.action == 'list':
            return FormGoogleModelSerializaer
        if self.action in ['update', 'patch', 'partial_update']:
            return UpdateFormGoogleModelSerializaer
        return FormGoogleFullModelSerializaer

    def create(self, request, *args, **kwargs):
        """
        Create a new Google Form
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        form = serializer.save()
        data = FormGoogleModelSerializaer(form, many=False).data
        return Response(data=data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(
            created_by=request.user
        )
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        # Se obtienen todas las preguntas
        questions = FormQuestion.objects.filter(
            is_active=True,
            form=instance
        )
        data = {
            'form': serializer.data,
            'number_questions': len(questions),
            'questions': FormQuestionModelSerializer(questions, many=True).data
        }
        return Response(data)

    @action(detail=True, methods=['get'])
    def participants(self, request, *args, **kwargs):
        """
        Get the list of people who have answered the form, and the datetime they made it.
        """
        # Se obtiene todos los FormParticipant del FormGoogle
        form = self.get_object()
        form_participants = FormParticipant.objects.filter(
            is_active=True,
            form=form
        )
        participants = []
        for participant in form_participants:
            participants.append({
                'id': participant.id,
                'answered_by': UserSimplifyModelSerializaer(participant.answered_by, many=False).data,
                'answered_at': participant.answered_at
            })
        # participants = [participant.answered_by for participant in form_participants]
        data = {
            'form': FormGoogleModelSerializaer(form, many=False).data,
            'count_participants': len(participants),
            'participants': participants
        }
        return Response(data=data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def average_responses(self, request, *args, **kwargs):
        """
        Get the list of people who have answered the form, and the datetime they made it.
        """
        # Se obtienen todas las preguntas del Form, y las respuestas realizadas
        form = self.get_object()
        questions = FormQuestion.objects.filter(is_active=True, form=form)
        answers = AnswerQuestion.objects.filter(is_active=True, form_participant__form=form)
        # Calculando el promedio de respuestas de cada pregunta
        results = []
        for question in questions:
            question_answers = answers.filter(question=question)
            data_question = FormQuestionModelSerializer(question, many=False).data
            data_question['result'] = question_answers.aggregate(Avg('answer'))['answer__avg']
            results.append(data_question)
        count_participants = FormParticipant.objects.filter(is_active=True, form=form).count()
        data = {
            'form': FormGoogleModelSerializaer(form, many=False).data,
            'count_participants': count_participants,
            'results': results
        }
        return Response(data=data, status=status.HTTP_200_OK)
