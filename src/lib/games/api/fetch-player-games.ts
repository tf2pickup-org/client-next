import { apiUrl } from '$environment';
import type { PaginatedList } from '$lib/shared/models/paginated-list';
import type { Game } from '../models/game';
import { error } from '@sveltejs/kit';

export const fetchPlayerGames = async (
  playerId: string,
  offset = 0,
  limit = 10,
): Promise<PaginatedList<Game>> => {
  const res = await fetch(`${apiUrl}/games?playerId=${playerId}&offset=${offset}&limit=${limit}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
