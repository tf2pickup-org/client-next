import { callSocket } from '$lib/io/call-socket';
import type { Game } from '../types/game';

export const replacePlayer = (gameId: string, replaceeId: string) =>
  callSocket<Game>('replace player', { gameId, replaceeId });
