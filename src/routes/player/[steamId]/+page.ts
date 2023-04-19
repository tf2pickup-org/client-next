import { fetchPlayer } from '$lib/players/api/fetch-player.js';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  const player = await fetchPlayer(params.steamId);
  return { player };
}) satisfies PageLoad;
