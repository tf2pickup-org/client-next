import { apiUrl } from '$environment';
import type { TwitchTvStream } from '../types/twitch-tv-stream';
import { error } from '@sveltejs/kit';

export const fetchStreams = async (fetchF: typeof fetch): Promise<TwitchTvStream[]> => {
  const res = await fetchF(`${apiUrl}/twitch/streams`);
  if (res.ok) {
    return await res.json();
  }

  if (res.status === 404) {
    return [];
  }

  throw error(res.status);
};
