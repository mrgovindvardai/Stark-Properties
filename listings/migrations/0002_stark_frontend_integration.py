from decimal import Decimal

from django.db import migrations, models
import django.db.models.deletion
from django.utils.text import slugify


def fill_slugs_and_seed_properties(apps, schema_editor):
    Property = apps.get_model("listings", "Property")
    for item in Property.objects.filter(slug="").iterator():
        base = slugify(item.title) or "residence"
        candidate = base
        suffix = 2
        while Property.objects.exclude(pk=item.pk).filter(slug=candidate).exists():
            candidate = f"{base}-{suffix}"
            suffix += 1
        item.slug = candidate
        item.save(update_fields=["slug"])

    samples = [
        {
            "slug": "verdant-house",
            "title": "The Verdant House",
            "eyebrow": "CONTEMPORARY RESIDENCE CONCEPT",
            "category": "Contemporary Villas",
            "property_type": "Villa",
            "description": "A contemporary residence concept shaped around natural light, generous living spaces, and landscaped surroundings.",
            "price": Decimal("24000000"),
            "price_label": "₹2.4 Crore onwards",
            "city": "Bengaluru",
            "address": "",
            "bedrooms": 4,
            "bathrooms": 4,
            "area_sqft": 3200,
            "highlights": ["Slatted teak screens for thermal ventilation", "Floor-to-ceiling glass pavilions overlooking a reflection pool", "Indigenous tropical flora and private courtyard", "Double-height living volume with natural cross-breeze"],
            "architectural_note": "Designed to blur the threshold between inner sanctuary and tropical garden, capturing morning sun through limestone apertures.",
            "featured": True,
        },
        {
            "slug": "courtyard-residence",
            "title": "The Courtyard Residence",
            "eyebrow": "SIGNATURE RESIDENCE CONCEPT",
            "category": "Signature Developments",
            "property_type": "Villa",
            "description": "An elegant residential concept that balances privacy, outdoor connections, and considered material choices.",
            "price": Decimal("13500000"),
            "price_label": "₹1.35 Crore onwards",
            "city": "Mysuru",
            "address": "",
            "bedrooms": 3,
            "bathrooms": 3,
            "area_sqft": 2100,
            "highlights": ["Central open-to-sky atrium with frangipani centerpiece", "Warm ivory lime-wash plaster surfaces", "Dark bronze window mullions and artisanal joinery", "Rainwater harvesting channel with stone acoustic basin"],
            "architectural_note": "Rooted in traditional regional courtyard typologies, reimagined with minimalist discipline and natural finishes.",
            "featured": False,
        },
        {
            "slug": "skyline-collection",
            "title": "The Skyline Collection",
            "eyebrow": "URBAN RESIDENCE CONCEPT",
            "category": "Urban Residences",
            "property_type": "Penthouse",
            "description": "A contemporary urban living concept with a focus on clean lines, functional layouts, and everyday convenience.",
            "price": Decimal("9500000"),
            "price_label": "₹95 Lakh onwards",
            "city": "Bengaluru",
            "address": "",
            "bedrooms": 3,
            "bathrooms": 2,
            "area_sqft": 1650,
            "highlights": ["Panoramic sunset skyline vista", "Seamless microcement floor transition to outdoor terrace", "Acoustically isolated private master suite", "Integrated architectural linear lighting"],
            "architectural_note": "Elevated urban living that prioritizes daylight orientation, acoustic tranquility, and flow into expansive sky decks.",
            "featured": False,
        },
        {
            "slug": "quiet-grove",
            "title": "The Quiet Grove",
            "eyebrow": "NATURE-INSPIRED RESIDENCE CONCEPT",
            "category": "Nature Retreats",
            "property_type": "Villa",
            "description": "A nature-led residential concept inspired by greenery, calm spaces, and a closer connection with the outdoors.",
            "price": None,
            "price_label": "Price on request",
            "city": "Other",
            "address": "",
            "bedrooms": 3,
            "bathrooms": 3,
            "area_sqft": 2800,
            "highlights": ["Cantilevered cedar roof structure over stone foundation", "Double-height glass framing a forest canopy", "Non-invasive landscape footprint", "Thermal mass stone hearth and natural cross-ventilation"],
            "architectural_note": "A sanctuary designed to dissolve into its topography, letting the woodland canopy filter golden light throughout the day.",
            "featured": False,
        },
    ]
    for sample in samples:
        Property.objects.get_or_create(slug=sample["slug"], defaults=sample)


class Migration(migrations.Migration):
    dependencies = [("listings", "0001_initial")]

    operations = [
        migrations.AddField("property", "slug", models.SlugField(blank=True, default="", max_length=180)),
        migrations.AddField("property", "eyebrow", models.CharField(blank=True, default="THOUGHTFULLY DESIGNED RESIDENCE", max_length=120)),
        migrations.AddField("property", "category", models.CharField(default="Contemporary Villas", max_length=80)),
        migrations.AddField("property", "price_label", models.CharField(blank=True, max_length=80)),
        migrations.AddField("property", "highlights", models.JSONField(blank=True, default=list)),
        migrations.AddField("property", "architectural_note", models.TextField(blank=True)),
        migrations.AddField("property", "featured", models.BooleanField(default=False)),
        migrations.AlterField("property", "property_type", models.CharField(choices=[("Villa", "Villa"), ("Apartment", "Apartment"), ("Penthouse", "Penthouse"), ("Plot", "Plot"), ("house", "House"), ("land", "Land"), ("commercial", "Commercial")], default="Villa", max_length=20)),
        migrations.AlterField("property", "price", models.DecimalField(blank=True, decimal_places=2, max_digits=13, null=True)),
        migrations.AlterField("property", "address", models.CharField(blank=True, max_length=240)),
        migrations.AlterField("property", "area_sqft", models.PositiveIntegerField(default=0)),
        migrations.AlterModelOptions(name="property", options={"ordering": ["-featured", "-created_at"]}),
        migrations.RunPython(fill_slugs_and_seed_properties, migrations.RunPython.noop),
        migrations.AlterField("property", "slug", models.SlugField(blank=True, max_length=180, unique=True)),
        migrations.CreateModel(
            name="Inquiry",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("reference_id", models.CharField(editable=False, max_length=12, unique=True)),
                ("full_name", models.CharField(max_length=140)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(max_length=30)),
                ("preferred_location", models.CharField(max_length=100)),
                ("property_type", models.CharField(max_length=40)),
                ("budget", models.CharField(max_length=60)),
                ("contact_method", models.CharField(choices=[("email", "Email"), ("phone", "Phone"), ("whatsapp", "WhatsApp")], max_length=12)),
                ("message", models.TextField(blank=True)),
                ("consent", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("property", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="inquiries", to="listings.property")),
            ],
        ),
        migrations.CreateModel(
            name="NewsletterSubscriber",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
