import { fetchPlayerGames } from '$lib/games/api/fetch-player-games';
import { fetchLinkedProfiles } from '$lib/players/api/fetch-linked-profiles';
import { fetchPlayer } from '$lib/players/api/fetch-player';
import { fetchPlayerStats } from '$lib/players/api/fetch-player-stats';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  const [player, stats, games] = await Promise.all([
    fetchPlayer(params.id),
    fetchPlayerStats(params.id),
    fetchPlayerGames(params.id),
  ]);
  const linkedProfiles = await fetchLinkedProfiles(player);
  return { player, stats, games, linkedProfiles };
}) satisfies PageLoad;
