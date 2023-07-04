import { apiUrl } from '$environment';
import type { Game } from '../types/game';
import { error } from '@sveltejs/kit';

export const fetchGame = async (gameId: string, fetchF: typeof fetch = fetch): Promise<Game> => {
  const res = await fetchF(`${apiUrl}/games/${gameId}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
