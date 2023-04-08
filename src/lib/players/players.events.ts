import { socket } from '$lib/io/socket';
import type { Player } from './types/player';
import { fromEvent } from 'rxjs';

export const playerConnected = fromEvent<Player>(socket, 'player connected');
export const playerDisconnected = fromEvent<Player>(socket, 'player disconnected');
