import { fetchGameLaunchSpans } from '$lib/statistics/api/fetch-game-launch-spans';
import { fetchGameLaunchesPerDay } from '$lib/statistics/api/fetch-game-launches-per-day';
import { fetchMostPlayedMaps } from '$lib/statistics/api/fetch-most-played-maps.js';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
  const [mostPlayedMaps, gameLaunchesPerDay, gameLaunchSpans] = await Promise.all([
    fetchMostPlayedMaps(fetch),
    fetchGameLaunchesPerDay(fetch),
    fetchGameLaunchSpans(fetch),
  ]);
  return {
    mostPlayedMaps,
    gameLaunchesPerDay,
    gameLaunchSpans,
  };
}) satisfies PageLoad;
