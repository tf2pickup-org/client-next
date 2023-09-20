import { PUBLIC_WEBSITE_URL } from '$env/static/public';
import { fetchAllPlayers } from '$lib/players/api/fetch-all-player';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
  return {
    players: await fetchAllPlayers(fetch),
    metaTags: {
      title: 'players',
      canonical: `${PUBLIC_WEBSITE_URL}/players`,
    },
  };
}) satisfies PageLoad;
