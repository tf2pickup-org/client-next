import { callSocket } from '$lib/io/call-socket';
import type { QueueSlot } from '../types/queue-slot';

export const readyUp = () => callSocket<QueueSlot>('player ready');
