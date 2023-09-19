import { PUBLIC_API_URL } from '$env/static/public';
import type { PlayerLinkedProfiles } from '../types/player-linked-profiles';
import { error } from '@sveltejs/kit';

export const fetchPlayerLinkedProfiles = async (
  playerId: string,
  fetchF: typeof fetch = fetch,
): Promise<PlayerLinkedProfiles> => {
  const res = await fetchF(`${PUBLIC_API_URL}/players/${playerId}/linked-profiles`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
