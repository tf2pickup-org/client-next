import { fetchAllPlayers } from '$lib/players/api/fetch-all-player';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
  return {
    players: await fetchAllPlayers(fetch),
  };
}) satisfies PageLoad;
