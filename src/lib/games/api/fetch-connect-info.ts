import { apiUrl } from '$environment';
import type { ConnectInfo } from '../types/connect-info';
import { error } from '@sveltejs/kit';

export const fetchConnectInfo = async (
  gameId: string,
  fetchF: typeof fetch = fetch,
): Promise<ConnectInfo> => {
  const res = await fetchF(`${apiUrl}/games/${gameId}/connect-info`);
  if (res.ok) {
    return await res.json();
  } else {
    throw error(res.status);
  }
};
