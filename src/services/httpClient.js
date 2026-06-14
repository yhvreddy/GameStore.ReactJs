import { API_BASE_URL } from '../config/api.js';

let tokenProvider = () => null;

// Context registers the latest token provider so the API layer does not import React state directly.
export function setTokenProvider(provider) {
  tokenProvider = provider;
}

export async function request(path, options = {}) {
  const token = tokenProvider();
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') ?? '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = payload?.message ?? payload?.title ?? payload ?? `Request failed with ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export function jsonRequest(path, method, body) {
  return request(path, {
    method,
    body: JSON.stringify(body),
  });
}
