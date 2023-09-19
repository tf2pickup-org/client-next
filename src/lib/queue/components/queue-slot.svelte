<script lang="ts">
  import { canJoinQueue } from '$lib/can-join-queue.store';
  import type { Player } from '$lib/players/types/player';
  import { currentPlayer } from '$lib/profile/profile.store';
  import type { Tf2ClassName } from '$lib/shared/tf2-class-name';
  import { friendships, mySlot } from '../queue.store';
  import LeaveQueueButton from './leave-queue-button.svelte';
  import { MarkAsFriendButtonState } from './mark-as-friend-button-state';
  import MarkAsFriendButton from './mark-as-friend-button.svelte';
  import { IconPlus } from '@tabler/icons-svelte';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let id: number;
  export let ready: boolean;
  export let gameClass: Tf2ClassName;
  export let player: Player | undefined = undefined;

  let isMySlot: boolean = false;
  let canBefriend: boolean = false;
  let markedAsFriend: boolean = false;
  let markedAsFriendByMe: boolean = false;

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
  class="bg-abru-light-30 flex h-14 flex-row justify-stretch overflow-hidden rounded-lg shadow-md"
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
        class="text-abru-dark-3 flex-1 text-center text-xl font-bold hover:underline"
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
    <button
      class="transition-color bg-abru-light-30 text-abru-light-30 hover:bg-abru-light-750 hover:text-abru-light-60 flex flex-1 items-center justify-center duration-75"
      on:click={() => dispatch('joinQueue', { slotId: id })}
    >
      <IconPlus />
    </button>
  {/if}
</div>

<style lang="postcss">
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
