import { fetchWsToken } from '$lib/io/api/fetch-ws-token';
import { fetchOnlinePlayers } from '$lib/players/api/fetch-online-players';
import { fetchProfile } from '$lib/profile/api/fetch-profile';
import { fetchQueue } from '$lib/queue/api/fetch-queue';
import type { LayoutLoad } from './$types';

export const load = (async ({ fetch }) => {
  const [queue, profile, onlinePlayers, wsToken] = await Promise.all([
    fetchQueue(fetch),
    fetchProfile(fetch),
    fetchOnlinePlayers(fetch),
    fetchWsToken(fetch),
  ]);
  return {
    queue,
    profile,
    onlinePlayers,
    wsToken,
  };
}) satisfies LayoutLoad;
