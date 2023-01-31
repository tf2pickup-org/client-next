import { socket } from '$lib/io/socket';
import type { Friendship } from './models/friendship';
import type { MapVoteResult } from './models/map-vote-result';
import type { QueueSlot } from './models/queue-slot';
import type { QueueState } from './models/queue-state';
import type { SubstituteRequest } from './models/substitute-request';
import { fromEvent } from 'rxjs';

export const queueSlotsUpdated = fromEvent<QueueSlot[]>(socket, 'queue slots update');
export const queueStateUpdated = fromEvent<QueueState>(socket, 'queue state update');
export const mapVoteResultsUpdated = fromEvent<MapVoteResult[]>(socket, 'map vote results update');
export const substituteRequestsUpdated = fromEvent<SubstituteRequest[]>(
  socket,
  'substitute requests update',
);
export const friendshipsUpdated = fromEvent<Friendship[]>(socket, 'friendships update');
