from rest_framework import viewsets
from .models import Video, Subtitle
from .serializers import VideoSerializer, SubtitleSerializer

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

class SubtitleViewSet(viewsets.ModelViewSet):
    queryset = Subtitle.objects.all()
    serializer_class = SubtitleSerializer

# Create your views here.
