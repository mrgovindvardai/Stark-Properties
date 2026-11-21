import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("listings", "0003_alter_property_image_url")]

    operations = [
        migrations.AddField(
            model_name="property",
            name="image_file",
            field=models.FileField(
                blank=True,
                default="",
                upload_to="properties/%Y/%m/",
                validators=[django.core.validators.FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png", "webp"])],
            ),
            preserve_default=False,
        ),
    ]
