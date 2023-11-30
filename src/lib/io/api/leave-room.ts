import { callSocket } from '../call-socket';

export const leaveRoom = (room: string) => callSocket<string[]>('leave', room);
