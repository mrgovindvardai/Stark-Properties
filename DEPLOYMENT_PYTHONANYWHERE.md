# PythonAnywhere deployment

This project uses Django for the API and database, with a React/Vite frontend. Build the frontend before deployment; Vite writes it to `static/frontend/` so Django and PythonAnywhere can serve it on the same domain.

## 1. Prepare on Windows

From the folder containing `manage.py`:

```powershell
.\.venv311\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py check
cd frontend\lotus-developers-code
npm install
npm run build
cd ..\..
python manage.py collectstatic --noinput
```

The generated frontend files under `static/frontend/` are intentionally committed to Git. Do not commit `.venv*`, `node_modules`, `db.sqlite3`, `media`, `staticfiles`, or secrets. Sample residence/gallery data are recreated by migrations on the server.

## 2. Push to GitHub

```powershell
git add .
git commit -m "Prepare Stark Properties for PythonAnywhere"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

If `origin` already exists, use `git remote set-url origin ...` instead of adding it again.

## 3. Clone and install on PythonAnywhere

In a Bash console:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git stark-properties
cd stark-properties
mkvirtualenv --python=/usr/bin/python3.10 stark-properties-env
pip install -r requirements.txt
python manage.py check --deploy
python manage.py migrate
python manage.py collectstatic --noinput
mkdir -p /home/YOUR-USERNAME/stark-properties-media
```

Use the Python version selected for the Web app when creating the virtualenv. Python 3.10 is shown to match the supplied guide.

Create the web app with **Manual configuration** and the same Python version. Enable PythonAnywhere's **Force HTTPS** option after the app is working over HTTPS. Set its virtualenv path to:

```text
/home/YOUR-USERNAME/.virtualenvs/stark-properties-env
```

## 4. Configure environment and WSGI

In the PythonAnywhere WSGI configuration file, use your actual username/repository path. Keep the secret key in the WSGI environment, never in Git:

```python
import os
import sys

path = "/home/YOUR-USERNAME/stark-properties"
if path not in sys.path:
    sys.path.insert(0, path)

os.environ["DJANGO_SETTINGS_MODULE"] = "real_estate.settings"
os.environ["DJANGO_DEBUG"] = "false"
os.environ["DJANGO_ALLOWED_HOSTS"] = "YOUR-USERNAME.pythonanywhere.com"
os.environ["DJANGO_CSRF_TRUSTED_ORIGINS"] = "https://YOUR-USERNAME.pythonanywhere.com"
os.environ["DJANGO_SECRET_KEY"] = "PASTE-A-NEW-RANDOM-SECRET-KEY-HERE"
os.environ["DJANGO_MEDIA_ROOT"] = "/home/YOUR-USERNAME/stark-properties-media"

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

Generate a strong key in Bash:

```bash
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

Copy the generated value into the PythonAnywhere WSGI file. Do not paste it into project files or commit it.

## 5. Map static and uploaded media

In the PythonAnywhere Web tab, add these mappings:

| URL | Directory |
| --- | --- |
| `/static/` | `/home/YOUR-USERNAME/stark-properties/staticfiles` |
| `/media/` | `/home/YOUR-USERNAME/stark-properties-media` |

The static mapping serves the compiled React app, Django Admin styles, and SVG fallback. The media mapping serves property photos uploaded in Django Admin.

## 6. Create admin account and reload

```bash
cd /home/YOUR-USERNAME/stark-properties
workon stark-properties-env
python manage.py createsuperuser
```

Reload the web app from the Web tab. Visit `https://YOUR-USERNAME.pythonanywhere.com/`, check `/admin/`, submit a demo enquiry, and verify it under **Listings → Inquirys**.

## Notes

- SQLite is available on PythonAnywhere and suitable for this student deployment. PythonAnywhere notes it can be slower on its filesystem and is not recommended for production use. Back up the deployed database before code changes.
- Free account features and expiry limits can change; check PythonAnywhere's current plan details before relying on the site long-term.
- The sample residences and stock images are demonstrations. Replace them with approved property details and photos before presenting the site as real inventory.
