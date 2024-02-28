import { PUBLIC_API_URL } from '$env/static/public';
import type { Queue } from '../types/queue';
import { error } from '@sveltejs/kit';

export const fetchQueue = async (fetchF: typeof fetch = fetch): Promise<Queue> => {
  const res = await fetchF(`${PUBLIC_API_URL}/queue`);
  if (res.ok) {
    return await res.json();
  } else {
    error(res.status);
  }
};
