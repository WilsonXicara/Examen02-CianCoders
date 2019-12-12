"""
Main URLs module.
"""
# Django
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Django Admin
    path('admin/', admin.site.urls),
    # Apps
    path('api/v1/', include(('google_forms.forms.urls', 'forms'), namespace='forms')),
    path('api/v1/', include(('google_forms.users.urls', 'users'), namespace='users')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
