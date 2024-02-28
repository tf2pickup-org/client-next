import { PUBLIC_API_URL } from '$env/static/public';
import type { Game } from '../types/game';
import { error } from '@sveltejs/kit';

export const fetchGame = async (gameId: string, fetchF: typeof fetch = fetch): Promise<Game> => {
  const res = await fetchF(`${PUBLIC_API_URL}/games/${gameId}`);
  if (res.ok) {
    return await res.json();
  } else {
    error(res.status);
  }
};
