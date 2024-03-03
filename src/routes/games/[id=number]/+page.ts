import { fetchConnectInfo } from '$lib/games/api/fetch-connect-info.js';
import { fetchGame } from '$lib/games/api/fetch-game';
import { fetchGameEvents } from '$lib/games/api/fetch-game-events';
import type { ConnectInfo } from '$lib/games/types/connect-info.js';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch, parent }) => {
  const game = await fetchGame(params.id, fetch);
  const events = await fetchGameEvents(params.id, fetch);
  let connectInfo: ConnectInfo | undefined;
  let isMyGame = false;

  if (['created', 'configuring', 'launching', 'started'].includes(game.state)) {
    const { profile } = await parent();

    const mySlot = game.slots.find(slot => slot.player.id === profile.player.id);
    if (mySlot && ['active', 'waiting for substitute'].includes(mySlot.status)) {
      // I'm a member of this game
      isMyGame = true;
      connectInfo = await fetchConnectInfo(params.id, fetch);
    }
  }

  return {
    game,
    events,
    connectInfo,
    isMyGame,
  };
}) satisfies PageLoad;
