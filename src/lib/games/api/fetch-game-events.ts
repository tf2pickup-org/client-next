import { PUBLIC_API_URL } from '$env/static/public';
import type { GameEvent } from '../types/game-event';
import { error } from '@sveltejs/kit';

interface RawGameEvent extends Omit<GameEvent, 'at'> {
  at: string;
}

export const fetchGameEvents = async (
  gameId: string,
  fetchF: typeof fetch = fetch,
): Promise<GameEvent[]> => {
  const res = await fetchF(`${PUBLIC_API_URL}/games/${gameId}/events`);
  if (res.ok) {
    return ((await res.json()) as RawGameEvent[]).map(e => ({
      ...e,
      at: new Date(e.at),
    }));
  } else {
    throw error(res.status);
  }
};
