from django.urls import path
from . import views

urlpatterns = [
    path('schedule/', views.say_hello),
]
