<script lang="ts">
  import { canJoinQueue } from '$lib/can-join-queue.store';
  import { currentPlayer } from '$lib/profile/profile.store';
  import type { QueueSlot } from '../models/queue-slot';
  import { IconPlus, IconMinus } from '@tabler/icons-svelte';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let queueSlot: QueueSlot;
  let canTakeSlot: boolean = false;
  let isMySlot: boolean = false;

  const dispatch = createEventDispatcher();

  $: {
    canTakeSlot = !queueSlot.player;
    isMySlot = $currentPlayer && queueSlot.player?.id === $currentPlayer?.id;
  }
</script>

<div class="justify-stretch flex h-12 bg-white/70 shadow-md">
  {#if queueSlot.player}
    <div
      class="flex flex-1 items-center justify-center px-4 {isMySlot
        ? 'bg-white/90'
        : 'bg-white/80'}"
      in:fade={{ duration: 75 }}
    >
      <img src={queueSlot.player.avatar.small} alt="{queueSlot.player.name}'s avatar" width="32" />
      <a href="/player/{queueSlot.player.steamId}" class="flex-grow text-center text-xl">
        {queueSlot.player.name}
      </a>

      {#if isMySlot}
        <button
          class="flex h-8 w-8 items-center justify-center rounded border border-slate-100 bg-white transition-colors hover:bg-slate-100"
          on:click={() => dispatch('leaveQueue', { slotId: queueSlot.id })}
        >
          <IconMinus />
        </button>
      {:else}
        <div class="w-8" />
      {/if}
    </div>
  {:else if $canJoinQueue}
    <button
      class="flex flex-1 items-center justify-center text-fogra-300 opacity-0 transition-opacity duration-75 hover:opacity-100 focus:bg-white/50"
      disabled={!canTakeSlot}
      on:click={() => dispatch('joinQueue', { slotId: queueSlot.id })}
    >
      <IconPlus />
    </button>
  {/if}
</div>
