import { apiUrl } from '$environment';
import type { Game } from '../models/game';
import { error } from '@sveltejs/kit';

export const fetchGame = async (gameId: string): Promise<Game> => {
  const res = await fetch(`${apiUrl}/games/${gameId}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
