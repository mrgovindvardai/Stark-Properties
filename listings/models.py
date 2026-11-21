import uuid

from django.db import models
from django.core.validators import FileExtensionValidator
from django.utils.text import slugify


class Property(models.Model):
    class PropertyType(models.TextChoices):
        VILLA = "Villa", "Villa"
        APARTMENT = "Apartment", "Apartment"
        PENTHOUSE = "Penthouse", "Penthouse"
        PLOT = "Plot", "Plot"
        HOUSE = "house", "House"
        LAND = "land", "Land"
        COMMERCIAL = "commercial", "Commercial"

    title = models.CharField(max_length=160)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    eyebrow = models.CharField(max_length=120, blank=True, default="THOUGHTFULLY DESIGNED RESIDENCE")
    category = models.CharField(max_length=80, default="Contemporary Villas")
    property_type = models.CharField(max_length=20, choices=PropertyType.choices, default=PropertyType.VILLA)
    description = models.TextField()
    price = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    price_label = models.CharField(max_length=80, blank=True)
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=240, blank=True)
    bedrooms = models.PositiveSmallIntegerField(default=0)
    bathrooms = models.PositiveSmallIntegerField(default=0)
    area_sqft = models.PositiveIntegerField(default=0)
    image_url = models.URLField(blank=True, help_text="Optional property image URL")
    image_file = models.FileField(
        upload_to="properties/%Y/%m/",
        blank=True,
        validators=[FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png", "webp"])],
    )
    highlights = models.JSONField(default=list, blank=True)
    architectural_note = models.TextField(blank=True)
    featured = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-featured", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "residence"
            slug = base_slug
            suffix = 2
            while Property.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{suffix}"
                suffix += 1
            self.slug = slug
        if not self.price_label and self.price is not None:
            self.price_label = f"₹{self.price:,.0f} onwards"
        elif not self.price_label:
            self.price_label = "Price on request"
        super().save(*args, **kwargs)


class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="gallery_images")
    image_file = models.FileField(
        upload_to="properties/gallery/%Y/%m/",
        blank=True,
        validators=[FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png", "webp"])],
    )
    image_url = models.URLField(blank=True, help_text="Optional external image URL")
    caption = models.CharField(max_length=160, blank=True)
    sort_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "property gallery image"
        verbose_name_plural = "property gallery images"

    def __str__(self):
        return self.caption or f"Image for {self.property}"


class Inquiry(models.Model):
    class ContactMethod(models.TextChoices):
        EMAIL = "email", "Email"
        PHONE = "phone", "Phone"
        WHATSAPP = "whatsapp", "WhatsApp"

    reference_id = models.CharField(max_length=12, unique=True, editable=False)
    property = models.ForeignKey(Property, on_delete=models.SET_NULL, null=True, blank=True, related_name="inquiries")
    full_name = models.CharField(max_length=140)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    preferred_location = models.CharField(max_length=100)
    property_type = models.CharField(max_length=40)
    budget = models.CharField(max_length=60)
    contact_method = models.CharField(max_length=12, choices=ContactMethod.choices)
    message = models.TextField(blank=True)
    consent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = f"LD-{uuid.uuid4().hex[:6].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reference_id} — {self.full_name}"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
