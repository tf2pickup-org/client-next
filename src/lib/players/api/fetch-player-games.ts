import { PUBLIC_API_URL } from '$env/static/public';
import type { Game } from '$lib/games/types/game';
import type { PaginatedList } from '$lib/shared/types/paginated-list';
import { error } from '@sveltejs/kit';

export const fetchPlayerGames = async (
  playerId: string,
  offset: number,
  limit = 10,
  fetchF: typeof fetch = fetch,
): Promise<PaginatedList<Game>> => {
  const res = await fetchF(
    `${PUBLIC_API_URL}/games?player=${playerId}&offset=${offset}&limit=${limit}`,
  );
  if (res.ok) {
    return await res.json();
  } else {
    error(res.status);
  }
};
