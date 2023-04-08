import { fetchOnlinePlayers } from '$lib/players/api/fetch-online-players';
import { fetchProfile } from '$lib/profile/api/fetch-profile';
import { fetchQueue } from '$lib/queue/api/fetch-queue';
import type { LayoutLoad } from './$types';

export const load = (async ({ fetch }) => {
  const [queue, profile, onlinePlayers] = await Promise.all([
    fetchQueue(fetch),
    fetchProfile(fetch),
    fetchOnlinePlayers(fetch),
  ]);
  return {
    queue,
    profile,
    onlinePlayers,
  };
}) satisfies LayoutLoad;
