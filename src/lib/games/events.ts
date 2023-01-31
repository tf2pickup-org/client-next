import { socket } from '$lib/io/socket';
import type { Game } from './models/game';
import { fromEvent } from 'rxjs';

export const gameCreated = fromEvent<Game>(socket, 'game created');
export const gameUpdated = fromEvent<Game>(socket, 'game updated');
