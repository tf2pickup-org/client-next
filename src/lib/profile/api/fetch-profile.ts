import { apiUrl } from '$environment';
import type { Profile } from '../types/profile';
import { error } from '@sveltejs/kit';

export const fetchProfile = async (fetchF: typeof fetch): Promise<Profile | undefined> => {
  const res = await fetchF(`${apiUrl}/profile`);
  if (res.ok) {
    return await res.json();
  }

  if (res.status === 401) {
    return undefined;
  }

  throw error(res.status);
};
