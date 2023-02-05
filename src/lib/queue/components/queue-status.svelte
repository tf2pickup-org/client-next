<script lang="ts">
  import type { QueueState } from '../models/queue-state';
  import { IconLoader3 } from '@tabler/icons-svelte';
  import { fade } from 'svelte/transition';

  export let queueState: QueueState;
  export let currentPlayerCount: number = 0;
  export let requiredPlayerCount: number = 12;
</script>

{#if ['waiting', 'ready', 'launching'].includes(queueState)}
  <div
    class="flex h-14 justify-center bg-white/60 p-2 text-fogra-900 shadow-md sm:py-2"
    in:fade={{ duration: 100 }}
  >
    <div class="font-caption text-4xl">
      <span>players:</span>
      {currentPlayerCount}/{requiredPlayerCount}
    </div>
  </div>
{:else}
  <div class="flex h-14 items-center justify-center p-2 text-4xl text-white">
    <div class="animate-spin">
      <IconLoader3 />
    </div>
  </div>
{/if}
