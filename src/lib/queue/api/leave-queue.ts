import { socket } from '$lib/io/socket';
import type { QueueSlot } from '../models/queue-slot';

export const leaveQueue = (): Promise<QueueSlot> =>
  new Promise<QueueSlot>(resolve => {
    socket.emit('leave queue', (response: QueueSlot) => resolve(response));
  });
