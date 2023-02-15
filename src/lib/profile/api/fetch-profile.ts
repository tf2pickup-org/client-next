import { apiUrl } from '$environment';
import { authorizedFetch } from '$lib/auth/authorized-fetch';
import type { Profile } from '../models/profile';
import { error } from '@sveltejs/kit';

export const fetchProfile = async (): Promise<Profile> => {
  const res = await authorizedFetch(`${apiUrl}/profile`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
