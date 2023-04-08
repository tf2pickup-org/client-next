import { apiUrl } from '$environment';
import { error } from '@sveltejs/kit';

export const fetchWsToken = async (fetchF: typeof fetch = fetch): Promise<string | undefined> => {
  const res = await fetchF(`${apiUrl}/auth/wstoken`);
  if (res.ok) {
    const { wsToken } = await res.json();
    return wsToken;
  }

  if (res.status === 401) {
    return undefined;
  }

  throw error(res.status);
};
