import { apiUrl } from '$environment';
import type { Player } from '../models/player';
import { error } from '@sveltejs/kit';

export const fetchAllPlayers = async (): Promise<Player[]> => {
  const res = await fetch(`${apiUrl}/players`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
