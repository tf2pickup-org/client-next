import { fetchLinkedProfiles } from '$lib/players/api/fetch-linked-profiles';
import { fetchPlayer } from '$lib/players/api/fetch-player';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  const player = await fetchPlayer(params.id);
  const linkedProfiles = await fetchLinkedProfiles(player);
  return { player, linkedProfiles };
}) satisfies PageLoad;
