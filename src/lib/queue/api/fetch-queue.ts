import { apiUrl } from '$environment';
import type { Queue } from '../types/queue';
import { error } from '@sveltejs/kit';

export const fetchQueue = async (fetchF: typeof fetch = fetch): Promise<Queue> => {
  const res = await fetchF(`${apiUrl}/queue`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
