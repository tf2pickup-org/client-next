import { fetchGame } from '$lib/games/api/fetch-game';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  const game = await fetchGame(params.id);
  return { game };
}) satisfies PageLoad;
