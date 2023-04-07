import { callSocket } from '$lib/io/call-socket';
import type { QueueSlot } from '../types/queue-slot';

export const joinQueue = (slotId: number) => callSocket<QueueSlot>('join queue', { slotId });
