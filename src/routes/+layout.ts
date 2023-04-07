import { fetchProfile } from '$lib/profile/api/fetch-profile';
import { fetchQueue } from '$lib/queue/api/fetch-queue';
import type { LayoutLoad } from './$types';

export const load = (async ({ fetch }) => {
  const queue = await fetchQueue(fetch);
  const profile = await fetchProfile(fetch);
  return {
    queue,
    profile,
  };
}) satisfies LayoutLoad;
