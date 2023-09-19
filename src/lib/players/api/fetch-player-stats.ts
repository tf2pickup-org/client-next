import { PUBLIC_API_URL } from '$env/static/public';
import type { PlayerStats } from '../types/player-stats';
import { error } from '@sveltejs/kit';

export const fetchPlayerStats = async (
  playerId: string,
  fetchF: typeof fetch = fetch,
): Promise<PlayerStats> => {
  const res = await fetchF(`${PUBLIC_API_URL}/players/${playerId}/stats`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
