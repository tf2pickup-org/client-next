import { apiUrl } from '$environment';
import type { Player } from '../types/player';
import { error } from '@sveltejs/kit';

export const fetchOnlinePlayers = async (fetchF: typeof fetch): Promise<Player[]> => {
  const res = await fetchF(`${apiUrl}/online-players`);
  if (res.ok) {
    return await res.json();
  }

  throw error(res.status);
};
