"""
Profile serializaer.
"""
# Django REST Framework
from rest_framework import serializers
# Models
from google_forms.users.models import Profile

class ProfileModelSerializer(serializers.ModelSerializer):
    """
    Profile model serializer.
    """

    class Meta:
        model = Profile
        fields = (
            'picture', 'biography',
            'forms_created', 'forms_answered',
        )
        read_only_fields = (
            'forms_created', 'forms_answered',
        )