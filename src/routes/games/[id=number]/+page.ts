import { fetchGame } from '$lib/games/api/fetch-game';

export const load = async ({ params, fetch }) => {
  const game = await fetchGame(params.id, fetch);
  return { game };
};
