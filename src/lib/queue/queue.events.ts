import { socket } from '$lib/io/socket';
import type { Friendship } from './types/friendship';
import type { MapVoteResult } from './types/map-vote-result';
import type { QueueSlot } from './types/queue-slot';
import type { QueueState } from './types/queue-state';
import type { SubstituteRequest } from './types/substitute-request';
import { fromEvent } from 'rxjs';

export const queueSlotsUpdated = fromEvent<QueueSlot[]>(socket, 'queue slots update');
export const queueStateUpdated = fromEvent<QueueState>(socket, 'queue state update');
export const mapVoteResultsUpdated = fromEvent<MapVoteResult[]>(socket, 'map vote results update');
export const substituteRequestsUpdated = fromEvent<SubstituteRequest[]>(
  socket,
  'substitute requests update',
);
export const friendshipsUpdated = fromEvent<Friendship[]>(socket, 'friendships update');
