import { currentPlayer } from '$lib/profile/profile.store';
import { fetchQueue } from './api/fetch-queue';
import {
  friendshipsUpdated,
  mapVoteResultsUpdated,
  queueSlotsUpdated,
  queueStateUpdated,
  substituteRequestsUpdated,
} from './events';
import { makeEmptyQueue } from './make-empty-queue';
import type { Friendship } from './models/friendship';
import type { MapVoteResult } from './models/map-vote-result';
import type { Queue } from './models/queue';
import type { QueueSlot } from './models/queue-slot';
import type { QueueState } from './models/queue-state';
import type { SubstituteRequest } from './models/substitute-request';
import produce from 'immer';
import type { Subscription } from 'rxjs';
import { derived, readable } from 'svelte/store';

export const queue = readable<Queue>(makeEmptyQueue(), set => {
  let value = { ...makeEmptyQueue() }; // current queue state
  const subscriptions: Subscription[] = [];

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

    subscriptions.push(
      queueSlotsUpdated.subscribe(updateSlots),
      queueStateUpdated.subscribe(updateState),
      mapVoteResultsUpdated.subscribe(updateMapVoteResults),
      substituteRequestsUpdated.subscribe(updateSubstituteRequests),
      friendshipsUpdated.subscribe(updateFriendships),
    );

    set(value);
  };

  loadQueueAndListenToEvents();
  return () => subscriptions.forEach(sub => sub.unsubscribe());
});

export const requiredPlayerCount = derived(queue, $queue => $queue.slots.length);

export const currentPlayerCount = derived(
  queue,
  $queue => $queue.slots.filter(slot => Boolean(slot.player)).length,
);

export const mapVoteResults = derived(queue, $queue => $queue.mapVoteResults);

export const mapVoteTotalCount = derived(mapVoteResults, $mapVoteResults =>
  $mapVoteResults.reduce((a, b) => a + b.voteCount, 0),
);

export const mySlot = derived(
  [currentPlayer, queue],
  ([$currentPlayer, $queue]) =>
    $currentPlayer && $queue.slots.find(slot => slot.player?.id === $currentPlayer.id),
);

export const isInQueue = derived(mySlot, $mySlot => Boolean($mySlot));
