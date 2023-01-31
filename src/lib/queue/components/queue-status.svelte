<script lang="ts">
  import type { QueueState } from '../models/queue-state';
  import Loading from 'svelte-material-icons/Loading.svelte';
  import { fade } from 'svelte/transition';

  export let queueState: QueueState;
  export let currentPlayerCount: number = 0;
  export let requiredPlayerCount: number = 12;
</script>

{#if ['waiting', 'ready', 'launching'].includes(queueState)}
  <div
    class="flex h-14 justify-center bg-queue-state-waiting p-2 text-on-surface shadow-md sm:py-2"
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
      <Loading />
    </div>
  </div>
{/if}
