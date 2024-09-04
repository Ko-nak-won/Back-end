from django import forms

class UploadFileForm(forms.Form):
	filename = forms.CharField(max_length=50)
	filedata = forms.FileField()
	language = forms.CharField(max_length=50)
	format = forms.CharField(max_length=50)