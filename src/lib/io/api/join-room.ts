import { callSocket } from '../call-socket';

export const joinRoom = (room: string) => callSocket<string[]>('join', room);
