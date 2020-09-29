from django.contrib import admin
from django.urls import path
from django.urls import include
from rest_framework.authtoken.views import obtain_auth_token
from .views import CustomObtainAuthToken


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('modules.tasks.urls')),
    path('tag/', include('modules.tags.urls')),
    path('account/', include('accounts.urls')),
    path('auth/', CustomObtainAuthToken.as_view()),

]
