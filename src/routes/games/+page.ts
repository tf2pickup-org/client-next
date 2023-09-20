import { PUBLIC_WEBSITE_URL } from '$env/static/public';
import { fetchGames } from '$lib/games/api/fetch-games';
import type { PageLoad } from './$types';

const gamesPerPage = 8;

export const load = (async ({ url, fetch }) => {
  const page = url.searchParams.has('page') ? parseInt(url.searchParams.get('page')!) : 1;
  return {
    games: await fetchGames((page - 1) * gamesPerPage, gamesPerPage, fetch),
    page,
    gamesPerPage,
    metaTags: {
      title: 'games',
      canonical: `${PUBLIC_WEBSITE_URL}/games`,
    },
  };
}) satisfies PageLoad;
