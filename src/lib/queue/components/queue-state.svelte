<script lang="ts">
  import { currentPlayerCount, isInQueue, requiredPlayerCount } from '../queue.store';
  import PreReadyUpButton from './pre-ready-up-button.svelte';
</script>

<div
  class="bg-abru-light-70 relative flex h-[55px] flex-row items-center justify-center rounded-lg p-2 shadow-md sm:py-2"
>
  <div class="mx-4 flex-1 text-xl font-bold lg:text-center">
    <span>Players:</span>
    {$currentPlayerCount}/{$requiredPlayerCount}
  </div>

  {#if $isInQueue}
    <div class="absolute right-2">
      <PreReadyUpButton />
    </div>
  {/if}
</div>
