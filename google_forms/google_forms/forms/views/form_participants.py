"""
Forms Participation ViewSets.
"""
# Django REST Framework
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
# Models
from google_forms.forms.models import (
    FormParticipant,
    FormGoogle,
    FormQuestion,
    AnswerQuestion,
)
# Serializers
from google_forms.forms.serializers import (
    FormGoogleModelSerializaer,
    CreateFormGoogleSerializaer,
    # 
    # FormQuestionModelSerializer,
    # 
    FormParticipantModelSerializer,
    CreateParticipationFormSerializaer,
    # 
    AnswerQuestionModelSerializer,
)
# Permissions
from rest_framework.permissions import IsAuthenticated
from google_forms.forms.permissions import IsFormOwnerPermission
# Utilities
from google_forms.utils.mixins import SoftDestroyModelMixin

class FormParticipationViewSet(mixins.ListModelMixin,       # Sólo el usuario dueño del formulario
                               mixins.CreateModelMixin,     # De parte del usuario invitado
                               mixins.RetrieveModelMixin,   # Sólo el usuario dueño del formulario
                               viewsets.GenericViewSet):
    """
    Form Participation ViewSet.
    """

    def dispatch(self, request, *args, **kwargs):
        """
        Verify that the form exists and is active.
        """
        # El FormGoogle está en el primer nivel de la URL, por lo que debería estar presente en todas las demas URL
        # Se verifica que cada vez que se valide esta vista, el FormGoogle esté disponible a toda la clase
        code = kwargs['code_form']     # Esto viene de la URL
        self.form = get_object_or_404(FormGoogle, code=code, is_active=True)
        return super(FormParticipationViewSet, self).dispatch(request, *args, **kwargs)

    def get_serializer_context(self):
        """
        Add form to serializer context.
        """
        context = super(FormParticipationViewSet, self).get_serializer_context()
        context['form'] = self.form
        return context

    def get_permissions(self):
        """
        Assign permission based on action.
        """
        permissions = [IsAuthenticated]
        if self.action in ['list', 'retrieve']:
            # Solo el propietario del formulario puede ver los resultados
            permissions.append(IsFormOwnerPermission)
        return [permission() for permission in permissions]

    def get_queryset(self):
        """
        Return the shares in the forms.
        """
        queryset = FormParticipant.objects.filter(is_active=True)
        return queryset

    def get_serializer_class(self):
        """
        Return serializer based on action.
        """
        if self.action == 'create':
            return CreateParticipationFormSerializaer
        # if self.action == 'list':
        #     return FormGoogleModelSerializaer
        return FormParticipantModelSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new Participation in Form
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        form_participant = serializer.save()
        # Obteniendo las respuestas
        answers = AnswerQuestion.objects.filter(
            is_active=True,
            form_participant=form_participant
        )
        data = {
            'information_form': FormParticipantModelSerializer(form_participant, many=False).data,
            'total_questions': len(answers),
            'answers': AnswerQuestionModelSerializer(answers, many=True).data
        }
        return Response(data=data, status=status.HTTP_201_CREATED)

    # def list(self, request, *args, **kwargs):
    #     queryset = self.get_queryset().filter(
    #         created_by=request.user
    #     )
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)

    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)

    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance)
    #     # Se obtienen todas las preguntas
    #     questions = FormQuestion.objects.filter(
    #         is_active=True,
    #         form=instance
    #     )
    #     data = {
    #         'form': serializer.data,
    #         'number_questions': len(questions),
    #         'questions': FormQuestionModelSerializer(questions, many=True).data
    #     }
    #     return Response(data)
