import { fetchOnlinePlayers } from '$lib/players/api/fetch-online-players';
import { fetchProfile } from '$lib/profile/api/fetch-profile';
import { fetchQueue } from '$lib/queue/api/fetch-queue';
import { fetchStreams } from '$lib/streams/api/fetch-streams';
import type { LayoutLoad } from './$types';

export const load = (async ({ fetch }) => {
  const [queue, profile, onlinePlayers, streams] = await Promise.all([
    fetchQueue(fetch),
    fetchProfile(fetch),
    fetchOnlinePlayers(fetch),
    fetchStreams(fetch),
  ]);
  return {
    queue,
    profile,
    onlinePlayers,
    streams,
  };
}) satisfies LayoutLoad;
