import { fetchGame } from '$lib/games/api/fetch-game';
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params, fetch }) => {
  const game = await fetchGame(params.id, fetch);
  redirect(308, `/games/${game.number}`);
}) satisfies PageLoad;
