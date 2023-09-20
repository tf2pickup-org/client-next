import { PUBLIC_WEBSITE_NAME, PUBLIC_WEBSITE_URL } from '$env/static/public';
import { fetchPlayerGames } from '$lib/players/api/fetch-player-games';
import { fetchPlayerLinkedProfiles } from '$lib/players/api/fetch-player-linked-profiles';
import { fetchPlayerStats } from '$lib/players/api/fetch-player-stats';
import { fetchPlayer } from '$lib/players/api/fetch-player.js';
import type { PageLoad } from './$types';

const gamesPerPage = 5;

export const load = (async ({ params, fetch }) => {
  const page = 1;
  const player = await fetchPlayer(params.steamId, fetch);
  return {
    player,
    linkedProfiles: await fetchPlayerLinkedProfiles(params.steamId, fetch),
    lazy: {
      stats: fetchPlayerStats(params.steamId, fetch),
      games: fetchPlayerGames(params.steamId, (page - 1) * gamesPerPage, gamesPerPage, fetch),
    },
    page,
    gamesPerPage,
    metaTags: {
      title: player.name,
      description: `${player.name}'s profile on ${PUBLIC_WEBSITE_NAME}`,
      canonical: `${PUBLIC_WEBSITE_URL}/players/${params.steamId}`,
      openGraph: {
        url: `${PUBLIC_WEBSITE_URL}/players/${params.steamId}`,
        title: player.name,
        description: `${player.name}'s profile on ${PUBLIC_WEBSITE_NAME}`,
        images: [
          {
            url: player.avatar.large,
            width: 184,
            height: 184,
            alt: `${player.name}'s steam avatar`,
          },
        ],
        site_name: PUBLIC_WEBSITE_NAME,
        type: 'games.other',
      },
    },
  };
}) satisfies PageLoad;
