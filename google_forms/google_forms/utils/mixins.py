# Django REST Framework
from rest_framework.mixins import DestroyModelMixin
# Utilities
from django.utils import timezone

class SoftDestroyModelMixin(DestroyModelMixin):
    """
    Update the registry as voided so as not to delete it from the database.
    """
    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
