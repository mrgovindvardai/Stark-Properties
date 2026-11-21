# Stark Properties frontend and Django backend

The React/Vite frontend in this folder is wired to the Django application at the workspace root. Start Django on port 8000 and Vite on port 3000; `vite.config.ts` proxies API and static file requests to Django.

## API endpoints

- `GET /api/csrf/` sets Django's CSRF cookie for the browser session.
- `GET /api/properties/` returns the available property inventory as the `Property` shape used by the React UI.
- `POST /api/inquiries/` validates and stores consultation requests, then returns `{ "referenceId": "LD-...", "status": "received" }`.
- `POST /api/newsletter/` stores a validated email address.

Property records, consultation requests, and newsletter subscriptions can be managed in Django admin. Run `python manage.py migrate` from the workspace root to create the tables and sample residence concepts. Property photo uploads are saved to `MEDIA_ROOT` and returned as the API `image` URL.

The original AI Studio package omitted its photography. Blank property image URLs use the shared architectural SVG in the Django `static/images` folder. Replace contact placeholders and sample concept content with the correct Stark Properties information before publishing.
