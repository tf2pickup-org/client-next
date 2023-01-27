import { apiUrl } from '$environment';
import type { Document } from '../models/document';
import { error } from '@sveltejs/kit';

export const fetchDocument = async (documentName: string): Promise<Document> => {
  const res = await fetch(`${apiUrl}/documents/${documentName}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
