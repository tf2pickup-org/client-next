<script lang="ts">
  import { canJoinQueue } from '$lib/can-join-queue.store';
  import { currentPlayer } from '$lib/profile/profile.store';
  import type { QueueSlot } from '../types/queue-slot';
  import { IconPlus, IconMinus } from '@tabler/icons-svelte';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let queueSlot: QueueSlot;

  let isMySlot: boolean = false;

  const dispatch = createEventDispatcher();

  $: isMySlot = $currentPlayer && queueSlot.player?.id === $currentPlayer?.id;
</script>

<div class="bg-abru-600 flex h-14 flex-row justify-stretch overflow-hidden rounded-lg shadow-md">
  {#if queueSlot.player}
    <div
      class="flex flex-1 flex-row items-center justify-center p-2 {isMySlot
        ? 'bg-abru-100'
        : 'bg-abru-400'}"
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
        class="text-abru-800 flex-1 text-center text-xl font-bold hover:underline"
        href="/player/{queueSlot.player.steamId}">{queueSlot.player.name}</a
      >

      {#if isMySlot}
        <button
          class="bg-abru-600 mr-1 flex h-[34px] w-[34px] items-center justify-center rounded text-white"
          on:click={() => dispatch('leaveQueue', { slotId: queueSlot.id })}
        >
          <IconMinus />
        </button>
      {:else}
        <div class="w-[42px]" />
      {/if}
    </div>
  {:else if $canJoinQueue}
    <button
      class="transition-color bg-abru-600 text-abru-600 hover:bg-abru-500 hover:text-abru-400 flex flex-1 items-center justify-center duration-75"
      on:click={() => dispatch('joinQueue', { slotId: queueSlot.id })}
    >
      <IconPlus />
    </button>
  {/if}
</div>
