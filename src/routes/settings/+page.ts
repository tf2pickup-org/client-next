import { fetchPreferences } from '$lib/profile/api/fetch-preferences';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
  const preferences = await fetchPreferences(fetch);
  return { preferences };
}) satisfies PageLoad;
