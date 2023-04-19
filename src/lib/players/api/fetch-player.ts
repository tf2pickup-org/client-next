import { apiUrl } from '$environment';
import type { Player } from '../types/player';
import { error } from '@sveltejs/kit';

export const fetchPlayer = async (playerId: string): Promise<Player> => {
  const res = await fetch(`${apiUrl}/players/${playerId}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
