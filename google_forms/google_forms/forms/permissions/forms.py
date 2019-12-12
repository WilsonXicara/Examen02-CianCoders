"""
Forms permissions.
"""
# Django REST Framework
from rest_framework.permissions import BasePermission
# Models
from google_forms.forms.models import (
    FormParticipant,
    FormGoogle,
    FormQuestion,
)
# Utilities
from django.utils import timezone

class IsFormOwnerPermission(BasePermission):
    """
    Verify that the user is the creator of the form.

    Specifically associated with:
        + class google_forms.forms.models.FormGoogle
        + class google_forms.forms.models.FormQuestion
    """

    def has_permission(self, request, view):
        """
        Verify that the user is the creator of the form.
        """
        if view.action in ['list']:
            if hasattr(view, 'form'):
                obj = view.form
            elif hasattr(view, 'question'):
                obj = view.question
        else:
            obj = view.get_object()
        if type(obj) == FormGoogle:
            return request.user == obj.created_by
        if type(obj) == FormQuestion:
            return request.user == obj.form.created_by
        return False

    def has_object_permission(self, request, view, obj):
        """
        Verify that the user is the creator of the form.
        """
        if type(obj) == FormGoogle:
            return request.user == obj.created_by
        if type(obj) == FormQuestion:
            return request.user == obj.form.created_by
        return False

class IsFormEditable(BasePermission):
    """
    Check if the form can be edited.
    The form can be edited if:
        + No user has answered yet.
        + It is not yet closed (the current date is less than the closing date of the form).
    """

    def has_permission(self, request, view):
        """
        Check if the form can be edited.
        """
        # En la función 'dispatch(...)' del FormQuestionViewSet se agregó el FormGoogle como atributo
        count_answered = FormParticipant.objects.filter(
            is_active=True,
            form=view.form
        ).count()
        if count_answered > 0:
            return False
        if view.form.closed_at is not None:
            now = timezone.now()
            return now < view.form.closed_at
        return True

    def has_object_permission(self, request, view, obj):
        """
        Check if the form can be edited.
        """
        count_answered = FormParticipant.objects.filter(
            is_active=True,
            form=obj
        ).count()
        if count_answered > 0:
            return False
        if obj.closed_at is not None:
            now = timezone.now()
            return now < obj.closed_at
        return True
