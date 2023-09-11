import { PUBLIC_API_URL } from '$env/static/public';
import type { Player } from '../types/player';
import { error } from '@sveltejs/kit';

export const fetchOnlinePlayers = async (fetchF: typeof fetch = fetch): Promise<Player[]> => {
  const res = await fetchF(`${PUBLIC_API_URL}/online-players`);
  if (res.ok) {
    return await res.json();
  }

  throw error(res.status);
};
