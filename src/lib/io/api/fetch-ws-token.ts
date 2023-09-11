import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const fetchWsToken = async (fetchF: typeof fetch = fetch): Promise<string | undefined> => {
  const res = await fetchF(`${PUBLIC_API_URL}/auth/wstoken`, { credentials: 'include' });
  if (res.ok) {
    const { wsToken } = await res.json();
    return wsToken;
  }

  if (res.status === 401) {
    return undefined;
  }

  throw error(res.status);
};
