from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse, HttpResponseNotFound
from django.urls import include, path
from django.views.generic import RedirectView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("listings.urls")),
]

# In local development, send the site root to the React/Vite UI. Django is
# still the API and admin server on port 8000.
if settings.DEBUG:
    urlpatterns.append(path("", RedirectView.as_view(url="http://localhost:3000/", permanent=False)))
else:
    def react_frontend(request):
        index_file = settings.BASE_DIR / "static" / "frontend" / "index.html"
        try:
            return HttpResponse(index_file.read_text(encoding="utf-8"), content_type="text/html; charset=utf-8")
        except FileNotFoundError:
            return HttpResponseNotFound("Frontend assets are missing. Run npm run build before deployment.")

    urlpatterns.append(path("", react_frontend, name="frontend"))

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
