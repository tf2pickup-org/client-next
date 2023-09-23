import { PUBLIC_API_URL } from '$env/static/public';
import type { HallOfFame } from '../types/hall-of-fame';
import { error } from '@sveltejs/kit';

export const fetchHallOfFame = async (fetchF: typeof fetch = fetch): Promise<HallOfFame> => {
  const res = await fetchF(`${PUBLIC_API_URL}/hall-of-fame`);
  if (res.ok) {
    return await res.json();
  }

  throw error(res.status);
};
