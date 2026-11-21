from django.urls import path

from . import views

urlpatterns = [
    path("csrf/", views.csrf_token, name="csrf_token"),
    path("properties/", views.property_api, name="property_api"),
    path("inquiries/", views.create_inquiry, name="create_inquiry"),
    path("newsletter/", views.subscribe_newsletter, name="subscribe_newsletter"),
    path("", views.property_list, name="property_list"),
    path("properties/<int:pk>/", views.property_detail, name="property_detail"),
]
