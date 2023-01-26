import { apiUrl } from '$environment';
import type { PlayerStats } from '../models/player-stats';
import { error } from '@sveltejs/kit';

export const fetchPlayerStats = async (playerId: string): Promise<PlayerStats> => {
  const res = await fetch(`${apiUrl}/players/${playerId}/stats`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
