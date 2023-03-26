from django.forms import ModelForm, Select, Textarea
from profile.models import Profile

class ProfileCreateForm(ModelForm):
    class Meta:
        model = Profile
        fields = '__all__'
