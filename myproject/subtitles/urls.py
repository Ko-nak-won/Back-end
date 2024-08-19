from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VideoViewSet, SubtitleViewSet

router = DefaultRouter()
router.register(r'videos', VideoViewSet)
router.register(r'subtitles', SubtitleViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
