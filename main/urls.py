from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.Home.as_view() , name='home'),
    path('about', views.About.as_view() , name='about'),
    path('contact', views.Contact.as_view(), name='contact'),
    path('primary-nav', views.PrimaryNav.as_view()),
    path('accounts/profile/', views.Profile.as_view(), name='profile'),
]
