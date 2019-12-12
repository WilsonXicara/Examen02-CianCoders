"""
Form questions ViewSets.
"""
# Django REST Framework
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
# Models
from google_forms.forms.models import (
    FormGoogle,
    FormQuestion,
)
# Serializers
from google_forms.forms.serializers import (
    FormQuestionModelSerializer,
)
# Permissions
from rest_framework.permissions import IsAuthenticated
from google_forms.forms.permissions import IsFormOwnerPermission, IsFormEditable
# Utilities
from google_forms.utils.mixins import SoftDestroyModelMixin

class FormQuestionViewSet(mixins.CreateModelMixin,
                          mixins.UpdateModelMixin,
                          SoftDestroyModelMixin,
                          viewsets.GenericViewSet):
    """
    Form question ViewSet.
    """
    lookup_field = 'id'     # Esto aplica al FormQuestion. Por defecto es 'id'

    def dispatch(self, request, *args, **kwargs):
        """
        Verify that the form exists and is active.
        """
        # El FormGoogle está en el primer nivel de la URL, por lo que debería estar presente en todas las demas URL
        # Se verifica que cada vez que se valide esta vista, el FormGoogle esté disponible a toda la clase
        code = kwargs['code_form']     # Esto viene de la URL
        self.form = get_object_or_404(FormGoogle, code=code, is_active=True)
        return super(FormQuestionViewSet, self).dispatch(request, *args, **kwargs)

    def get_permissions(self):
        """
        Assign permission based on action.
        """
        permissions = [IsAuthenticated]
        if self.action in ['create', 'update', 'patch', 'partial_update', 'destroy']:
            # Solo el propietario del formulario puede modificarlo
            permissions.extend([
                IsFormOwnerPermission,
                # Este permiso es funcional. Sin embargo, la respuesta devuelta por el mismo no es lo
                # suficiente claro para expresar la razón del por qué el formulario no es editable.
                # Por lo que se opta por hacer la validación (hecha en el permiso) en el serializador
                #IsFormEditable,
            ])
        return [permission() for permission in permissions]

    def get_queryset(self):
        """
        Returns all active questions associated with the form.
        """
        # FormQuestion tiene la llave foránea de FormGoogle
        # @Pendiente. ¿Cómo utilizar lo siguiente?:
        #queryset = self.form.questions_set.filter(
        #    is_active=True
        #)
        queryset = FormQuestion.objects.filter(
            is_active=True,
            form=self.form
        )
        return queryset

    def get_serializer_context(self):
        """
        Add form to serializer context.
        """
        context = super(FormQuestionViewSet, self).get_serializer_context()
        context['form'] = self.form
        return context

    def get_serializer_class(self):
        """
        Return serializer based on action.
        """
        if self.action in ['create', 'update', 'patch', 'partial_update']:
            return FormQuestionModelSerializer
        return FormQuestionModelSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new Form question.
        If the question is created successfully, it returns an HTTP_201_CREATED code and no body
        """
        serializer_class = self.get_serializer_class()
        context = self.get_serializer_context()     # Ya incluye el request
        serializer = serializer_class(
            data=request.data,
            context=context
        )
        serializer.is_valid(raise_exception=True)
        question = serializer.save()
        # Sólo se devuelve un HTTP_201_CREATED porque esta operación puede ser llamada más de una vez al mismo tiempo
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
