import { fetchConnectInfo } from '$lib/games/api/fetch-connect-info.js';
import { fetchGame } from '$lib/games/api/fetch-game';
import type { ConnectInfo } from '$lib/games/types/connect-info.js';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch, parent }) => {
  const game = await fetchGame(params.id, fetch);
  let connectInfo: ConnectInfo | undefined;
  let isMyGame = false;

  if (['created', 'configuring', 'launching', 'started'].includes(game.state)) {
    const { profile } = await parent();

    if (
      profile &&
      ['active', 'waiting for substitute'].includes(
        game.slots.find(slot => slot.player.id === profile.player.id)?.status ?? '',
      )
    ) {
      // I'm a member of this game
      isMyGame = true;
      connectInfo = await fetchConnectInfo(params.id, fetch);
    }
  }

  return {
    game,
    connectInfo,
    isMyGame,
  };
}) satisfies PageLoad;
