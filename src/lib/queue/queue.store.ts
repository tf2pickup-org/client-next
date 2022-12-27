import { apiUrl } from '$environment';
import { derived, readable } from 'svelte/store';
import type { Queue } from './models/queue';

const initialQueue: Queue = {
  config: {
    teamCount: 2,
    classes: [],
  },
  slots: [],
  state: 'loading',
  mapVoteResults: [],
  friendships: [],
};

export const queue = readable<Queue>(initialQueue, set => {
  const fetchQueue = async () => {
    const res = await fetch(`${apiUrl}/queue`);

    if (res.ok) {
      set(await res.json());
    }
  };

  fetchQueue();
});

export const requiredPlayerCount = derived(queue, $queue => $queue.slots.length);

export const currentPlayerCount = derived(
  queue,
  $queue => $queue.slots.filter(slot => Boolean(slot.player)).length,
);
