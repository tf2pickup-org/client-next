import { PUBLIC_API_URL } from '$env/static/public';
import type { PlayerPreferences } from '../types/player-preferences';
import { error } from '@sveltejs/kit';

export const savePreferences = async (
  preferences: PlayerPreferences,
  fetchF: typeof fetch = fetch,
): Promise<PlayerPreferences> => {
  const res = await fetchF(`${PUBLIC_API_URL}/profile/preferences`, {
    credentials: 'include',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preferences),
  });
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
