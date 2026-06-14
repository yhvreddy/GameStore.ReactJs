// Vite exposes env variables prefixed with VITE_. Keep API configuration in one file.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export const STORAGE_KEYS = {
  auth: 'gamestore.auth',
};
