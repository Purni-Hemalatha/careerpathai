from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "status": "CareerPath Backend API is running smoothly \u2728", 
        "endpoints": ["/api/categories/", "/api/careers/", "/api/roadmap-steps/", "/admin/"]
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', api_root),
]
