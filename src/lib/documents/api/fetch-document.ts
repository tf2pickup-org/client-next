import { PUBLIC_API_URL } from '$env/static/public';
import type { Document } from '../types/document';
import { error } from '@sveltejs/kit';

export const fetchDocument = async (
  name: string,
  fetchF: typeof fetch = fetch,
): Promise<Document> => {
  const res = await fetchF(`${PUBLIC_API_URL}/documents/${name}`);
  if (res.ok) {
    return await res.json();
  } else {
    error(res.status);
  }
};
