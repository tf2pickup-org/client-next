<script lang="ts">
  import { canJoinQueue } from '$lib/can-join-queue.store';
  import { currentPlayer } from '$lib/profile/profile.store';
  import { friendships, mySlot } from '../queue.store';
  import type { QueueSlot } from '../types/queue-slot';
  import { IconPlus, IconMinus, IconHeart, IconHeartFilled } from '@tabler/icons-svelte';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let queueSlot: QueueSlot;

  let isMySlot: boolean = false;
  let canBefriend: boolean = false;
  let markedAsFriend: boolean = false;
  let markedAsFriendByMe: boolean = false;

  const dispatch = createEventDispatcher();

  $: {
    isMySlot = queueSlot.player?.id === $currentPlayer?.id;
    canBefriend = $mySlot?.canMakeFriendsWith?.includes(queueSlot.gameClass) ?? false;

    if (canBefriend) {
      const friendship = $friendships.find(f => f.targetPlayerId === queueSlot.player?.id);
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
  {#if queueSlot.player}
    <div
      class="flex flex-1 flex-row items-center justify-center p-2 {isMySlot
        ? 'bg-abru-light-75'
        : 'bg-abru-light-60'}"
      in:fade={{ duration: 75 }}
      out:fade={{ duration: 50 }}
    >
      <img
        src={queueSlot.player.avatar.medium}
        width="64"
        height="64"
        alt="{queueSlot.player.name}'s name"
        class="h-[42px] w-[42px] rounded"
      />
      <a
        class="text-abru-dark-3 flex-1 text-center text-xl font-bold hover:underline"
        href="/player/{queueSlot.player.steamId}">{queueSlot.player.name}</a
      >
      <div class="w-[42px] px-1">
        {#if isMySlot}
          <button
            class="bg-abru-light-30 hover:bg-abru-light-35 flex h-[34px] w-[34px] items-center justify-center rounded text-white"
            on:click={() => dispatch('leaveQueue', { slotId: queueSlot.id })}
          >
            <IconMinus />
          </button>
        {:else if canBefriend}
          <button
            class="bg-abru-light-75 flex h-[34px] w-[34px] items-center justify-center rounded {markedAsFriendByMe
              ? 'text-accent-600'
              : 'text-abru-950'} disabled:text-abru-light-60 hover:bg-abru-light-70 transition-colors duration-75"
            disabled={markedAsFriend && !markedAsFriendByMe}
            on:click={() =>
              dispatch('markAsFriend', {
                friendPlayerId: markedAsFriendByMe ? null : queueSlot.player?.id,
              })}
          >
            {#if markedAsFriendByMe}
              <IconHeartFilled />
            {:else}
              <IconHeart />
            {/if}
          </button>
        {/if}
      </div>
    </div>
  {:else if $canJoinQueue}
    <button
      class="transition-color bg-abru-light-30 text-abru-light-30 hover:bg-abru-light-750 hover:text-abru-light-60 flex flex-1 items-center justify-center duration-75"
      on:click={() => dispatch('joinQueue', { slotId: queueSlot.id })}
    >
      <IconPlus />
    </button>
  {/if}
</div>
