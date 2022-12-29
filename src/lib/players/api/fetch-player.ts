import { apiUrl } from '$environment';
import { error } from '@sveltejs/kit';
import type { Player } from '../models/player';

export const fetchPlayer = async (playerId: string): Promise<Player> => {
  const res = await fetch(`${apiUrl}/players/${playerId}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
