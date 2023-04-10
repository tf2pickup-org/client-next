import type { TwitchTvStream } from './types/twitch-tv-stream';
import { writable } from 'svelte/store';

export const streams = writable<TwitchTvStream[]>([]);
