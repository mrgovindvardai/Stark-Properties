from django.core.validators import FileExtensionValidator
from django.db import migrations, models
import django.db.models.deletion


GALLERY_PHOTOS = {
    "verdant-house": [
        ("Interior living space", "photo-1600607687939-ce8a6c25118c"),
        ("Sunlit living room", "photo-1600210492486-724fe5c67fb0"),
    ],
    "courtyard-residence": [
        ("Open-plan interior", "photo-1600566753086-00f18fb6b3ea"),
        ("Warm contemporary living", "photo-1600607687920-4e2a09cf159d"),
    ],
    "skyline-collection": [
        ("Modern apartment interior", "photo-1600210492486-724fe5c67fb0"),
        ("Bright city residence", "photo-1600566753190-17f0baa2a6c3"),
    ],
    "quiet-grove": [
        ("Nature-inspired interior", "photo-1600607687939-ce8a6c25118c"),
        ("Quiet living space", "photo-1600047509807-ba8f99d2cdde"),
    ],
}


def seed_gallery(apps, schema_editor):
    Property = apps.get_model("listings", "Property")
    PropertyImage = apps.get_model("listings", "PropertyImage")
    for slug, photos in GALLERY_PHOTOS.items():
        property_obj = Property.objects.filter(slug=slug).first()
        if property_obj is None:
            continue
        for order, (caption, photo_id) in enumerate(photos, start=1):
            PropertyImage.objects.get_or_create(
                property=property_obj,
                sort_order=order,
                defaults={
                    "caption": caption,
                    "image_url": f"https://images.unsplash.com/{photo_id}?auto=format&fit=crop&w=1400&q=82",
                },
            )


class Migration(migrations.Migration):
    dependencies = [("listings", "0004_seed_residence_photos")]

    operations = [
        migrations.CreateModel(
            name="PropertyImage",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("image_file", models.FileField(blank=True, upload_to="properties/gallery/%Y/%m/", validators=[FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png", "webp"])])),
                ("image_url", models.URLField(blank=True, help_text="Optional external image URL")),
                ("caption", models.CharField(blank=True, max_length=160)),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("property", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="gallery_images", to="listings.property")),
            ],
            options={
                "verbose_name": "property gallery image",
                "verbose_name_plural": "property gallery images",
                "ordering": ["sort_order", "id"],
            },
        ),
        migrations.RunPython(seed_gallery, migrations.RunPython.noop),
    ]
