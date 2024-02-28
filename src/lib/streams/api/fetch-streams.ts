import { PUBLIC_API_URL } from '$env/static/public';
import type { TwitchTvStream } from '../types/twitch-tv-stream';
import { error } from '@sveltejs/kit';

export const fetchStreams = async (fetchF: typeof fetch = fetch): Promise<TwitchTvStream[]> => {
  const res = await fetchF(`${PUBLIC_API_URL}/twitch/streams`);
  if (res.ok) {
    return await res.json();
  }

  if (res.status === 404) {
    return [];
  }

  error(res.status);
};
