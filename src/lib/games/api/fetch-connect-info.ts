import { PUBLIC_API_URL } from '$env/static/public';
import type { ConnectInfo } from '../types/connect-info';
import { error } from '@sveltejs/kit';

export const fetchConnectInfo = async (
  gameId: string,
  fetchF: typeof fetch = fetch,
): Promise<ConnectInfo> => {
  const res = await fetchF(`${PUBLIC_API_URL}/games/${gameId}/connect-info`, {
    credentials: 'include',
  });
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
