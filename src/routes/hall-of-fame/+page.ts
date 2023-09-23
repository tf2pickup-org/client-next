import { fetchHallOfFame } from '$lib/hall-of-fame/api/fetch-hall-of-fame';
import { fetchPlayer } from '$lib/players/api/fetch-player';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
  const hallOfFame = await fetchHallOfFame(fetch);
  const [mostActivePlayers, mostActiveMedics] = [
    Promise.all(
      hallOfFame.mostActivePlayers.map(async r => ({
        count: r.count,
        player: await fetchPlayer(r.player),
      })),
    ),
    Promise.all(
      hallOfFame.mostActiveMedics.map(async r => ({
        count: r.count,
        player: await fetchPlayer(r.player),
      })),
    ),
  ];
  return {
    mostActivePlayers,
    mostActiveMedics,
  };
}) satisfies PageLoad;
