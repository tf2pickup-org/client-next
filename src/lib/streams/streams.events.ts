import { socket } from '$lib/io/socket';
import type { TwitchTvStream } from './types/twitch-tv-stream';
import { fromEvent } from 'rxjs';

export const streamsUpdated = fromEvent<TwitchTvStream[]>(socket, 'twitch streams update');
