import { PUBLIC_API_URL } from '$env/static/public';
import { profile } from '../profile.store';
import { error } from '@sveltejs/kit';

export const acceptRules = async () => {
  const res = await fetch(`${PUBLIC_API_URL}/profile?accept_terms`, {
    method: 'POST',
    credentials: 'include',
  });
  if (res.ok) {
    profile.update(profile => (profile ? { ...profile, hasAcceptedRules: true } : undefined));
  } else {
    throw error(res.status);
  }
};
