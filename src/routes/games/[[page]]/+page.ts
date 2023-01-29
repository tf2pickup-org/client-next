import { fetchGames } from '$lib/games/api/fetch-games';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  const page = params.page ? parseInt(params.page) : 1;
  const gamesPerPage = 5;
  return {
    games: await fetchGames((page - 1) * gamesPerPage, gamesPerPage),
    page,
  };
}) satisfies PageLoad;
