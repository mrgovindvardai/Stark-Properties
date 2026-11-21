import { InquiryFormData } from './utils/validation';
import { Property } from './data/properties';

async function responseJson<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : {};
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Django rejected the request. Refresh the page; if you opened it from another device, make sure that address is listed in CSRF_TRUSTED_ORIGINS.');
    }
    throw new Error(body.error || 'The request could not be completed. Please try again.');
  }
  return body as T;
}

export async function loadProperties(): Promise<Property[]> {
  const response = await fetch('/api/properties/');
  return responseJson<Property[]>(response);
}

export async function prepareCsrf(): Promise<void> {
  const response = await fetch('/api/csrf/');
  await responseJson<{ detail: string }>(response);
}

function csrfToken(): string {
  const cookie = document.cookie.split('; ').find((part) => part.startsWith('csrftoken='));
  return cookie ? decodeURIComponent(cookie.split('=').slice(1).join('=')) : '';
}

export async function sendInquiry(data: InquiryFormData, propertyId?: string) {
  if (!csrfToken()) await prepareCsrf();
  const response = await fetch('/api/inquiries/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken() },
    body: JSON.stringify({ ...data, propertyId }),
  });
  return responseJson<{ referenceId: string; status: string }>(response);
}

export async function subscribe(email: string) {
  if (!csrfToken()) await prepareCsrf();
  const response = await fetch('/api/newsletter/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken() },
    body: JSON.stringify({ email }),
  });
  return responseJson<{ status: string }>(response);
}
