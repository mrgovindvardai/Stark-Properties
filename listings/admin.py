from django.contrib import admin

from .models import Inquiry, NewsletterSubscriber, Property, PropertyImage


class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 3
    fields = ("image_file", "image_url", "caption", "sort_order")


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    inlines = (PropertyImageInline,)
    list_display = ("title", "city", "property_type", "price", "featured", "is_available")
    list_filter = ("property_type", "category", "city", "featured", "is_available")
    search_fields = ("title", "city", "address", "slug")
    prepopulated_fields = {"slug": ("title",)}
    fieldsets = (
        ("Listing", {"fields": ("title", "slug", "eyebrow", "category", "property_type", "description")} ),
        ("Price and location", {"fields": ("price", "price_label", "city", "address")} ),
        ("Details", {"fields": ("bedrooms", "bathrooms", "area_sqft", "highlights", "architectural_note")} ),
        ("Images", {"fields": ("image_file", "image_url")} ),
        ("Visibility", {"fields": ("featured", "is_available")} ),
    )


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ("reference_id", "full_name", "email", "preferred_location", "created_at")
    list_filter = ("contact_method", "property_type", "created_at")
    search_fields = ("reference_id", "full_name", "email", "phone")
    readonly_fields = ("reference_id", "created_at")


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at")
    search_fields = ("email",)
    readonly_fields = ("created_at",)
