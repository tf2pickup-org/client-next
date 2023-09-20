import { PUBLIC_WEBSITE_NAME, PUBLIC_WEBSITE_URL } from '$env/static/public';
import { fetchConnectInfo } from '$lib/games/api/fetch-connect-info.js';
import { fetchGame } from '$lib/games/api/fetch-game';
import type { ConnectInfo } from '$lib/games/types/connect-info.js';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch, parent }) => {
  const game = await fetchGame(params.id, fetch);
  let connectInfo: ConnectInfo | undefined;

  if (['created', 'configuring', 'launching', 'started'].includes(game.state)) {
    const { profile } = await parent();

    if (profile && game.slots.find(slot => slot.player.id === profile.player.id)) {
      // I'm a member of this game
      connectInfo = await fetchConnectInfo(params.id, fetch);
    }
  }

  return {
    game,
    connectInfo,
    metaTags: {
      title: `#${game.number}`,
      description: `game #${game.number} details`,
      canonical: `${PUBLIC_WEBSITE_URL}/games/${game.number}`,
      openGraph: {
        url: `${PUBLIC_WEBSITE_URL}/games/${game.number}`,
        title: `#${game.number}`,
        description: `game #${game.number} details`,
        images: [
          {
            url: `${PUBLIC_WEBSITE_URL}/favicon.png`,
            width: 256,
            height: 256,
            alt: `${PUBLIC_WEBSITE_NAME} icon`,
          },
        ],
        site_name: PUBLIC_WEBSITE_NAME,
        type: 'games.other',
      },
    },
  };
}) satisfies PageLoad;
