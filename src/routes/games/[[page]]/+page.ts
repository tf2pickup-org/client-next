import { fetchGames } from '$lib/games/api/fetch-games';
import type { PageLoad } from './$types';

const gamesPerPage = 10;

export const load = (async ({ params, fetch }) => {
  const page = params.page ? parseInt(params.page) : 1;
  return {
    games: await fetchGames((page - 1) * gamesPerPage, gamesPerPage, fetch),
    page,
  };
}) satisfies PageLoad;
