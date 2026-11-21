# Stark Properties

A learning project that combines a React/Vite editorial property website with a Django and SQLite backend.

## Run in VS Code on Windows

Use two VS Code terminals from the project root.

### 1. Start the Django backend

If the existing `.venv` does not run, create a new environment with Python 3.11:

```powershell
py -3.11 -m venv .venv311
.\.venv311\Scripts\python.exe -m pip install -r requirements.txt
.\.venv311\Scripts\python.exe manage.py migrate
.\.venv311\Scripts\python.exe manage.py createsuperuser
.\.venv311\Scripts\python.exe manage.py runserver 8000
```

The migration adds four sample residence concepts to SQLite so the UI has data to display. Edit or remove those examples in Django admin. Admin URL: `http://127.0.0.1:8000/admin/`.

### 2. Start the website

In a second terminal:

```powershell
cd frontend\lotus-developers-code
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:3000/`. For convenience, opening `http://127.0.0.1:8000/` also redirects to the React UI while Django is in development mode. Vite proxies `/api`, `/static`, and `/media` requests to Django.

For phone/tablet testing on the same Wi-Fi, add the computer's current Vite origin (for example `http://192.168.137.222:3000`) to `CSRF_TRUSTED_ORIGINS` in `real_estate/settings.py`. If the computer's LAN IP changes, update that entry and restart Django.

## Django-backed features

- Property listings, category/location/type/budget filters, and detail modals load from `/api/properties/`.
- Each property detail view includes an image gallery. Add uploaded photos or image URLs in the property's **Property gallery images** section in Django admin; the migration supplies two extra demo photos for each sample residence.
- Private consultation requests are validated and saved in the `Inquiry` table.
- Newsletter addresses are saved in the `NewsletterSubscriber` table.
- Add, edit, feature, or unpublish residences from Django admin. Upload a separate image for each listing in its **Images** section; the detail modal and gallery use that image.
- Uploaded images are stored under `media/properties/` and served locally while `DEBUG = True`.

The original UI ZIP omitted its photography. The four sample residences now use distinct Unsplash stock images, and the local architectural illustration is the fallback. The sample residences are concepts from the provided design, not verified live listings. Add your team's contact channels and actual property information before publishing. Unsplash image use follows the [Unsplash License](https://unsplash.com/license).

## Deploy to PythonAnywhere

See [DEPLOYMENT_PYTHONANYWHERE.md](DEPLOYMENT_PYTHONANYWHERE.md) for the GitHub, WSGI, static/media mapping, and first-deployment steps. Run `npm run build` before pushing so `static/frontend/` contains the latest React build.
