import { apiUrl } from '$environment';
import type { PaginatedList } from '$lib/shared/types/paginated-list';
import type { Game } from '../types/game';
import { error } from '@sveltejs/kit';

export const fetchGames = async (
  offset: number,
  limit = 10,
  fetchF: typeof fetch = fetch,
): Promise<PaginatedList<Game>> => {
  const res = await fetchF(`${apiUrl}/games?offset=${offset}&limit=${limit}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
