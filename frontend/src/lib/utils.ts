import type { ApiError } from '../types';

/** Extract error message from an Axios error response */
export function getErrorMessage(error: unknown, fallback: string): string {
  const apiError = error as ApiError;
  return apiError?.response?.data?.error || fallback;
}

/** Resolve an image URL that may be a relative path from the backend */
export function resolveImageUrl(url: string): string {
  if (url.startsWith('/')) {
    const base = import.meta.env.VITE_API_URL?.replace('/api', '') || '';
    return `${base}${url}`;
  }
  return url;
}

/** Parse images field which can be a JSON string or already an array */
export function parseImages(images: string | string[] | null | undefined): string[] {
  if (!images) return [];
  if (Array.isArray(images)) return images;
  try {
    const parsed = JSON.parse(images);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
