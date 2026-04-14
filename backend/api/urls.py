from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, CareerViewSet, RoadmapStepViewSet, register_user, login_user, get_profile, update_profile

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'careers', CareerViewSet)
router.register(r'roadmap-steps', RoadmapStepViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register_user, name='register_user'),
    path('auth/login/', login_user, name='login_user'),
    path('profile/fetch/', get_profile, name='get_profile'),
    path('profile/update/', update_profile, name='update_profile'),
]
