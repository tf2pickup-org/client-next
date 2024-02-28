import { PUBLIC_API_URL } from '$env/static/public';
import type { Player } from '../types/player';
import { error } from '@sveltejs/kit';

export const fetchAllPlayers = async (fetchF: typeof fetch = fetch): Promise<Player[]> => {
  const res = await fetchF(`${PUBLIC_API_URL}/players`);
  if (res.ok) {
    return await res.json();
  }

  error(res.status);
};
