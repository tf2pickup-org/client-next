import { socket } from '$lib/io/socket';
import { fetchQueue } from './api/fetch-queue';
import { makeEmptyQueue } from './make-empty-queue';
import type { Friendship } from './models/friendship';
import type { MapVoteResult } from './models/map-vote-result';
import type { Queue } from './models/queue';
import type { QueueSlot } from './models/queue-slot';
import type { QueueState } from './models/queue-state';
import type { SubstituteRequest } from './models/substitute-request';
import produce from 'immer';
import { derived, readable } from 'svelte/store';

export const queue = readable<Queue>(makeEmptyQueue(), set => {
  let value = { ...makeEmptyQueue() }; // current queue state

  const updateSlots = (slots: QueueSlot[]) => {
    value = produce(value, draft => {
      for (const slot of slots) {
        const idx = draft.slots.findIndex(s => s.id === slot.id);
        draft.slots[idx] = slot;
      }
    });
    set(value);
  };

  const updateState = (state: QueueState) => {
    value = produce(value, draft => {
      draft.state = state;
    });
    set(value);
  };

  const updateMapVoteResults = (results: MapVoteResult[]) => {
    value = produce(value, draft => {
      draft.mapVoteResults = results;
    });
    set(value);
  };

  const updateSubstituteRequests = (substituteRequests: SubstituteRequest[]) => {
    value = produce(value, draft => {
      draft.substituteRequests = substituteRequests;
    });
    set(value);
  };

  const updateFriendships = (friendships: Friendship[]) => {
    value = produce(value, draft => {
      draft.friendships = friendships;
    });
    set(value);
  };

  const loadQueueAndListenToEvents = async () => {
    value = await fetchQueue();
    socket.on('queue slots update', updateSlots);
    socket.on('queue state update', updateState);
    socket.on('map vote results update', updateMapVoteResults);
    socket.on('substitute requests update', updateSubstituteRequests);
    socket.on('friendships update', updateFriendships);
    set(value);
  };

  loadQueueAndListenToEvents();
  return () => {
    socket.off('queue slots update', updateSlots);
    socket.off('queue state update', updateState);
    socket.off('map vote results update', updateMapVoteResults);
    socket.off('substitute requests update', updateSubstituteRequests);
    socket.off('friendships update', updateFriendships);
  };
});

export const requiredPlayerCount = derived(queue, $queue => $queue.slots.length);

export const currentPlayerCount = derived(
  queue,
  $queue => $queue.slots.filter(slot => Boolean(slot.player)).length,
);
