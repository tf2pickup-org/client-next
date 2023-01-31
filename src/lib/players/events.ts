import { socket } from '$lib/io/socket';
import type { Player } from './models/player';
import { fromEvent } from 'rxjs';

export const playerConnected = fromEvent<Player>(socket, 'player connected');
export const playerDisconnected = fromEvent<Player>(socket, 'player disconnected');
