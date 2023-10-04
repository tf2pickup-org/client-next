import { PUBLIC_API_URL } from '$env/static/public';
import type { GameLaunchesPerDay } from '../types/game-launches-per-day';
import { error } from '@sveltejs/kit';
import { format, sub } from 'date-fns';

export const fetchGameLaunchesPerDay = async (
  fetchF: typeof fetch = fetch,
): Promise<GameLaunchesPerDay[]> => {
  const res = await fetchF(
    `${PUBLIC_API_URL}/statistics/game-launches-per-day?since=${format(
      sub(Date.now(), { months: 1 }),
      'yyyy-MM-dd',
    )}`,
  );
  if (res.ok) {
    return await res.json();
  }

  throw error(res.status);
};
