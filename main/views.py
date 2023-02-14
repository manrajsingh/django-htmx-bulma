from django.shortcuts import render
from django.views import View
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import ContactForm


# Create your views here.
class Home(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'home.html')


class About(TemplateView):
    template_name = 'about.html'


class Contact(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'contact.html')

    def post(self, request, *args, **kwargs):
        form = ContactForm(request.POST)
        if form.is_valid():
            return render(request,'partials/contact-form-success.html')
        else:
            return render(request,'partials/contact-form.html', {'form':form})


@method_decorator(login_required, name='dispatch')
class Profile(TemplateView):
    template_name = 'account/profile.html'


class PrimaryNav(TemplateView):
    template_name = 'partials/nav.html'