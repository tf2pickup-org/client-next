import { fetchGames } from '$lib/games/api/fetch-games';

const gamesPerPage = 10;

export const load = async ({ url, fetch }) => {
  const page = url.searchParams.has('page') ? parseInt(url.searchParams.get('page')!) : 1;
  return {
    games: await fetchGames((page - 1) * gamesPerPage, gamesPerPage, fetch),
    page,
  };
};
