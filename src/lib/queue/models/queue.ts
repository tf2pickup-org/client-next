import type { Friendship } from './friendship';
import type { MapVoteResult } from './map-vote-result';
import type { QueueConfig } from './queue-config';
import type { QueueSlot } from './queue-slot';
import type { QueueState } from './queue-state';
import type { SubstituteRequest } from './substitute-request';

export interface Queue {
  config: QueueConfig;
  slots: QueueSlot[];
  state: QueueState;
  mapVoteResults: MapVoteResult[];
  substituteRequests?: SubstituteRequest[];
  friendships: Friendship[];
}
