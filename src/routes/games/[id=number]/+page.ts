import { fetchConnectInfo } from '$lib/games/api/fetch-connect-info.js';
import { fetchGame } from '$lib/games/api/fetch-game';
import type { ConnectInfo } from '$lib/games/types/connect-info.js';

export const load = async ({ params, fetch }) => {
  const game = await fetchGame(params.id, fetch);
  let connectInfo: ConnectInfo | undefined;

  if (['created', 'configuring', 'launching', 'started'].includes(game.state)) {
    connectInfo = await fetchConnectInfo(params.id, fetch);
  }

  return { game, connectInfo };
};
