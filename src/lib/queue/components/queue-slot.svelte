<script lang="ts">
  import { canJoinQueue } from '$lib/can-join-queue.store';
  import type { Player } from '$lib/players/types/player';
  import { currentPlayer } from '$lib/profile/profile.store';
  import type { Tf2ClassName } from '$lib/shared/tf2-class-name';
  import { friendships, mySlot } from '../queue.store';
  import LeaveQueueButton from './leave-queue-button.svelte';
  import { MarkAsFriendButtonState } from './mark-as-friend-button-state';
  import MarkAsFriendButton from './mark-as-friend-button.svelte';
  import { IconLock, IconPlus } from '@tabler/icons-svelte';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let id: number;
  export let ready: boolean;
  export let gameClass: Tf2ClassName;
  export let player: Player | undefined = undefined;
  export let restricted = false;

  let isMySlot = false;
  let canBefriend = false;
  let markedAsFriend = false;
  let markedAsFriendByMe = false;

  const dispatch = createEventDispatcher();

  $: {
    isMySlot = player?.id === $currentPlayer?.id;
    canBefriend = $mySlot?.canMakeFriendsWith?.includes(gameClass) ?? false;

    if (canBefriend) {
      const friendship = $friendships.find(f => f.targetPlayerId === player?.id);
      markedAsFriend = Boolean(friendship);
      markedAsFriendByMe = markedAsFriend && friendship?.sourcePlayerId === $currentPlayer?.id;
    } else {
      markedAsFriend = markedAsFriendByMe = false;
    }
  }
</script>

<div
  class="flex h-14 flex-row justify-center overflow-hidden rounded-lg bg-abru-light-30 text-abru-light-50 shadow-md"
>
  {#if player}
    <div
      class="taken flex flex-1 flex-row items-center justify-center p-2"
      class:my-slot={isMySlot}
      class:ready
      in:fade={{ duration: 75 }}
    >
      <img
        src={player.avatar.medium}
        width="64"
        height="64"
        alt="{player.name}'s name"
        class="h-[42px] w-[42px] rounded"
      />
      <a
        class="flex-1 text-center text-xl font-bold text-abru-dark-3 hover:underline"
        href="/players/{player.steamId}">{player.name}</a
      >
      <div class="w-[42px] px-1">
        {#if isMySlot && !ready}
          <LeaveQueueButton on:click={() => dispatch('leaveQueue', { slotId: id })} />
        {:else if canBefriend}
          <MarkAsFriendButton
            state={markedAsFriend
              ? markedAsFriendByMe
                ? MarkAsFriendButtonState.selected
                : MarkAsFriendButtonState.disabled
              : MarkAsFriendButtonState.enabled}
            on:click={() =>
              dispatch('markAsFriend', {
                friendPlayerId: markedAsFriendByMe ? null : player?.id,
              })}
          />
        {/if}
      </div>
    </div>
  {:else if $canJoinQueue}
    {#if restricted}
      <IconLock size={32} class="self-center" />
    {:else}
      <button class="join-queue-button" on:click={() => dispatch('joinQueue', { slotId: id })}>
        <IconPlus />
      </button>
    {/if}
  {/if}
</div>

<style lang="postcss">
  .join-queue-button {
    @apply transition-colors;
    @apply duration-75;

    display: flex;
    flex: 1 1 0%;
    align-items: center;
    justify-content: center;

    background-color: theme('colors.abru.light.30');
    color: theme('colors.abru.light.30');

    &:hover {
      background-color: theme('colors.abru.light.25');
      color: theme('colors.abru.light.60');
    }
  }

  .taken {
    background-color: theme('colors.abru.light.60');

    &.my-slot {
      background-color: theme('colors.abru.light.75');
    }

    &.ready {
      background-color: #0a955b;
    }
  }
</style>
