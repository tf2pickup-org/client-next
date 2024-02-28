import { PUBLIC_API_URL } from '$env/static/public';
import type { PlayedMapCount } from '../types/played-map-count';
import { error } from '@sveltejs/kit';

export const fetchMostPlayedMaps = async (
  fetchF: typeof fetch = fetch,
): Promise<PlayedMapCount[]> => {
  const res = await fetchF(`${PUBLIC_API_URL}/statistics/played-maps-count`);
  if (res.ok) {
    return await res.json();
  }

  error(res.status);
};
