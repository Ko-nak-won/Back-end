from os import path
from tempfile import gettempdir
from django.views import View
from django.http import JsonResponse, HttpResponse

from .forms import UploadFileForm
from .api import process_video

class Upload(View):
	def post(self, request):
		form = UploadFileForm(request.POST, request.FILES)
		if form.is_valid():
			filename = path.join(gettempdir(), form.cleaned_data['filename'])
			filedata = form.files['filedata']
			language = form.cleaned_data['language']
			format = form.cleaned_data['format']

			with open(filename, 'wb') as f:
				f.write(filedata.read())

			result_filename = process_video(filename, language, format)
			response: JsonResponse = None

			try:
				with open(result_filename, 'rb') as f:
					response = HttpResponse(f, content_type='application/octet-stream')
					response['Content-Disposition'] = f'attachment; filename="{result_filename}"'
			except IOError:
				response = JsonResponse({"error": "Cannot load the generated file"})
			return response
		else:
			return JsonResponse({"error": "The given parameters are not enough."})
