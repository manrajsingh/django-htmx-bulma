from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(label='Name', max_length=50, required=True)
    email = forms.EmailField(label='Email', required=True)
    message = forms.CharField(label='Message', widget=forms.Textarea, required=True)