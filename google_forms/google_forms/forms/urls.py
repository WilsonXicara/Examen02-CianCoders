"""
Forms URLs.
"""

# Django
from django.urls import path, include
# Django REST Framework
from rest_framework.routers import DefaultRouter
# Views
from google_forms.forms.views import forms as form_views
from google_forms.forms.views import form_questions as form_question_views
from google_forms.forms.views import form_participants as form_participation_views

router = DefaultRouter()
router.register(
    'forms',
    form_views.FormGoogleViewSet,
    basename='forms'
)
# Las preguntas de un formulario parten desde un formulario
router.register(
    r'forms/(?P<code_form>[-a-zA-Z0-9_]+)/questions',
    form_question_views.FormQuestionViewSet,
    basename='questions'
)
# Las respuestas de un formulario parten desde un formulario
router.register(
    r'forms/(?P<code_form>[-a-zA-Z0-9_]+)/answer',
    form_participation_views.FormParticipationViewSet,
    basename='answer'
)

urlpatterns = [
    path('', include(router.urls)),
]
