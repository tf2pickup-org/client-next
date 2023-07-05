import { fetchGame } from '$lib/games/api/fetch-game';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
  const game = await fetchGame(params.id, fetch);
  return { game };
}) satisfies PageLoad;
