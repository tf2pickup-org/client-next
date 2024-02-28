import { PUBLIC_API_URL } from '$env/static/public';
import type { PlayerPreferences } from '../types/player-preferences';
import { error } from '@sveltejs/kit';

export const fetchPreferences = async (
  fetchF: typeof fetch = fetch,
): Promise<PlayerPreferences> => {
  const res = await fetchF(`${PUBLIC_API_URL}/profile/preferences`, { credentials: 'include' });
  if (res.ok) {
    return await res.json();
  }

  error(res.status);
};
