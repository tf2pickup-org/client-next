import type { Queue } from './types/queue';
import { derived, writable } from 'svelte/store';

export const queue = writable<Queue>();

export const queueConfig = derived(queue, $queue => $queue?.config);
export const queueSlots = derived(queue, $queue => $queue?.slots);

export const requiredPlayerCount = derived(queueSlots, $queueSlots => $queueSlots?.length ?? 0);
export const currentPlayerCount = derived(
  queueSlots,
  $queueSlots => $queueSlots?.filter(slot => Boolean(slot.player)).length ?? 0,
);

export const mapVoteResults = derived(queue, $queue => $queue.mapVoteResults);

export const mapVoteTotalCount = derived(mapVoteResults, $mapVoteResults =>
  $mapVoteResults.reduce((a, b) => a + b.voteCount, 0),
);
