from django.db import migrations


STOCK_PHOTOS = {
    "verdant-house": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85",
    "courtyard-residence": "https://images.unsplash.com/photo-1761158497156-c8f202a07b42?auto=format&fit=crop&w=1600&q=85",
    "skyline-collection": "https://images.unsplash.com/photo-1763847283115-792496dbe688?auto=format&fit=crop&w=1600&q=85",
    "quiet-grove": "https://images.unsplash.com/photo-1729731322969-4c53e076980c?auto=format&fit=crop&w=1600&q=85",
}


def add_stock_photos(apps, schema_editor):
    Property = apps.get_model("listings", "Property")
    for slug, photo_url in STOCK_PHOTOS.items():
        Property.objects.filter(slug=slug, image_url="", image_file="").update(image_url=photo_url)


class Migration(migrations.Migration):
    dependencies = [("listings", "0003_property_image_upload")]

    operations = [migrations.RunPython(add_stock_photos, migrations.RunPython.noop)]
