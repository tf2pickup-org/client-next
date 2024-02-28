import { PUBLIC_API_URL } from '$env/static/public';
import type { GameEvent } from '../types/game-event';
import { error } from '@sveltejs/kit';

export const fetchGameEvents = async (
  gameId: string,
  fetchF: typeof fetch = fetch,
): Promise<GameEvent[]> => {
  const res = await fetchF(`${PUBLIC_API_URL}/games/${gameId}/events`);
  if (res.ok) {
    return await res.json();
  } else {
    error(res.status);
  }
};
