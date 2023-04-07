<script lang="ts">
  import type { QueueSlot } from '../types/queue-slot';
  import { IconPlus } from '@tabler/icons-svelte';

  export let queueSlot: QueueSlot;
</script>

<div class="bg-abru-600 flex h-14 flex-row justify-stretch overflow-hidden rounded-lg shadow-md">
  {#if queueSlot.player}
    <div class="bg-abru-400 flex flex-1 flex-row items-center justify-center p-2">
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
      <div class="w-[42px]" />
    </div>
  {:else}
    <button
      class="transition-color bg-abru-600 text-abru-600 hover:bg-abru-500 hover:text-abru-400 flex flex-1 items-center justify-center duration-75"
    >
      <IconPlus />
    </button>
  {/if}
</div>
