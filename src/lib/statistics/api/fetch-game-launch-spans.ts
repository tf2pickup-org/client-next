import { PUBLIC_API_URL } from '$env/static/public';
import type { GameLaunchTimeSpan } from '../types/game-launch-time-span';
import { error } from '@sveltejs/kit';

export const fetchGameLaunchSpans = async (
  fetchF: typeof fetch = fetch,
): Promise<GameLaunchTimeSpan[]> => {
  const res = await fetchF(`${PUBLIC_API_URL}/statistics/game-launch-time-spans`);
  if (res.ok) {
    return await res.json();
  }

  throw error(res.status);
};
