import { socket } from '$lib/io/socket';
import type { QueueSlot } from '../models/queue-slot';

export const joinQueue = (slotId: number): Promise<QueueSlot> => {
  return new Promise<QueueSlot>(resolve => {
    socket.emit('join queue', { slotId }, (response: QueueSlot) => resolve(response));
  });
};
