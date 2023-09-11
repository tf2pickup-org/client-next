import { PUBLIC_API_URL } from '$env/static/public';
import type { Profile } from '../types/profile';
import { error } from '@sveltejs/kit';

export const fetchProfile = async (fetchF: typeof fetch = fetch): Promise<Profile | undefined> => {
  const res = await fetchF(`${PUBLIC_API_URL}/profile`, { credentials: 'include' });
  if (res.ok) {
    return await res.json();
  }

  if (res.status === 401) {
    return undefined;
  }

  throw error(res.status);
};
