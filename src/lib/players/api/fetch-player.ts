import { PUBLIC_API_URL } from '$env/static/public';
import type { Player } from '../types/player';
import { error } from '@sveltejs/kit';

export const fetchPlayer = async (
  playerId: string,
  fetchF: typeof fetch = fetch,
): Promise<Player> => {
  const res = await fetchF(`${PUBLIC_API_URL}/players/${playerId}`);
  if (res.ok) {
    return await res.json();
  } else {
    error(res.status);
  }
};
