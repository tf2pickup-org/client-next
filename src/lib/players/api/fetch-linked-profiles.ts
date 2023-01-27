import { apiUrl } from '$environment';
import type { LinkedProfiles } from '../models/linked-profiles';
import type { Player } from '../models/player';
import { error } from '@sveltejs/kit';

export const fetchLinkedProfiles = async (player: Player): Promise<LinkedProfiles> => {
  const href = player._links.find(link => link.title === 'Linked profiles')?.href;
  if (!href) {
    throw Error('no linked profiles');
  }

  const res = await fetch(`${apiUrl}${href}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
