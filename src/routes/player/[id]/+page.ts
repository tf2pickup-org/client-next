import { apiUrl } from '$environment';
import type { Game } from '$lib/games/models/game';
import type { Player } from '$lib/players/models/player';
import type { PlayerStats } from '$lib/players/models/player-stats';
import type { PaginatedList } from '$lib/shared/models/paginated-list';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
  const [player, stats] = await Promise.all([
    (async () => {
      const res = await fetch(`${apiUrl}/players/${params.id}`);
      if (res.ok) {
        const player: Player = await res.json();
        return player;
      } else {
        throw error(res.status);
      }
    })(),
    (async () => {
      const res = await fetch(`${apiUrl}/players/${params.id}/stats`);
      if (res.ok) {
        const stats: PlayerStats = await res.json();
        return stats;
      } else {
        throw error(res.status);
      }
    })(),
  ]);

  const games = await (async () => {
    const res = await fetch(`${apiUrl}/games?playerId=${player.id}`);
    if (res.ok) {
      return await res.json() as PaginatedList<Game>;
    } else {
      throw error(res.status);
    }
  })();

  return { player, stats, games };
}) satisfies PageLoad;
