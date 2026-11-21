import json

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_POST

from .models import Inquiry, NewsletterSubscriber, Property


@ensure_csrf_cookie
@require_GET
def csrf_token(request):
    return JsonResponse({"detail": "CSRF cookie set"})


@require_GET
def property_api(request):
    items = []
    for item in Property.objects.filter(is_available=True):
        price = float(item.price) if item.price is not None else None
        city = item.city
        items.append(
            {
                "id": item.slug,
                "name": item.title,
                "eyebrow": item.eyebrow,
                "location": city if city == "Other" else f"{city}, Karnataka",
                "city": city if city in {"Bengaluru", "Mysuru", "Hubballi", "Other"} else "Other",
                "address": item.address,
                "category": item.category,
                "propertyType": item.get_property_type_display(),
                "priceLabel": item.price_label,
                "priceNumeric": price,
                "bedrooms": item.bedrooms or None,
                "bathrooms": item.bathrooms or None,
                "areaSqFt": item.area_sqft or None,
                "description": item.description,
                "image": item.image_file.url if item.image_file else item.image_url or "/static/images/architecture-placeholder.svg",
                "images": [
                    image.image_file.url if image.image_file else image.image_url
                    for image in item.gallery_images.all()
                    if image.image_file or image.image_url
                ],
                "highlights": item.highlights,
                "architecturalNote": item.architectural_note,
                "featured": item.featured,
            }
        )
    return JsonResponse(items, safe=False)


def _read_json(request):
    try:
        return json.loads(request.body or b"{}"), None
    except (json.JSONDecodeError, UnicodeDecodeError):
        return None, JsonResponse({"error": "Request body must be valid JSON."}, status=400)


@require_POST
def create_inquiry(request):
    data, error = _read_json(request)
    if error:
        return error
    if not isinstance(data, dict):
        return JsonResponse({"error": "Request body must be a JSON object."}, status=400)

    name = str(data.get("fullName", "")).strip()
    email = str(data.get("email", "")).strip()
    phone = str(data.get("phone", "")).strip()
    required = {
        "fullName": name,
        "email": email,
        "phone": phone,
        "preferredLocation": str(data.get("preferredLocation", "")).strip(),
        "propertyType": str(data.get("propertyType", "")).strip(),
        "budget": str(data.get("budget", "")).strip(),
        "contactMethod": str(data.get("contactMethod", "")).strip().lower(),
    }
    missing = [field for field, value in required.items() if not value]
    if missing:
        return JsonResponse({"error": "Please complete all required fields.", "fields": missing}, status=400)
    try:
        validate_email(email)
    except ValidationError:
        return JsonResponse({"error": "Please enter a valid email address."}, status=400)
    digits = "".join(character for character in phone if character.isdigit())
    if len(digits) < 7 or len(digits) > 15:
        return JsonResponse({"error": "Please enter a valid phone number."}, status=400)
    if data.get("consent") is not True:
        return JsonResponse({"error": "Consent is required before we can contact you."}, status=400)
    if required["contactMethod"] not in Inquiry.ContactMethod.values:
        return JsonResponse({"error": "Please choose a valid contact method."}, status=400)

    property_obj = None
    property_id = data.get("propertyId")
    if property_id:
        property_obj = Property.objects.filter(slug=str(property_id), is_available=True).first()
        if property_obj is None:
            return JsonResponse({"error": "That residence is no longer available."}, status=400)
    inquiry = Inquiry.objects.create(
        property=property_obj,
        full_name=name,
        email=email,
        phone=phone,
        preferred_location=required["preferredLocation"],
        property_type=required["propertyType"],
        budget=required["budget"],
        contact_method=required["contactMethod"],
        message=str(data.get("message", ""))[:5000],
        consent=True,
    )
    return JsonResponse({"referenceId": inquiry.reference_id, "status": "received"}, status=201)


@require_POST
def subscribe_newsletter(request):
    data, error = _read_json(request)
    if error:
        return error
    if not isinstance(data, dict):
        return JsonResponse({"error": "Request body must be a JSON object."}, status=400)
    email = str(data.get("email", "")).strip()
    try:
        validate_email(email)
    except ValidationError:
        return JsonResponse({"error": "Please enter a valid email address."}, status=400)
    NewsletterSubscriber.objects.get_or_create(email=email.lower())
    return JsonResponse({"status": "subscribed"}, status=201)


def property_list(request):
    properties = Property.objects.filter(is_available=True)
    query = request.GET.get("q", "").strip()
    property_type = request.GET.get("type", "").strip()
    max_price = request.GET.get("max_price", "").strip()

    if query:
        properties = properties.filter(city__icontains=query)
    if property_type:
        properties = properties.filter(property_type=property_type)
    if max_price:
        try:
            properties = properties.filter(price__lte=max_price)
        except (ValueError, TypeError):
            max_price = ""

    return render(
        request,
        "listings/property_list.html",
        {
            "properties": properties,
            "query": query,
            "selected_type": property_type,
            "max_price": max_price,
            "property_types": Property.PropertyType.choices,
        },
    )


def property_detail(request, pk):
    property = get_object_or_404(Property, pk=pk, is_available=True)
    return render(request, "listings/property_detail.html", {"property": property})
