<script lang="ts">
  import { currentPlayerCount, isInQueue, requiredPlayerCount } from '../queue.store';
  import { IconCoffee } from '@tabler/icons-svelte';
  import { fade } from 'svelte/transition';
</script>

<div
  class="bg-abru-light-70 relative flex h-[55px] flex-row items-center justify-center rounded-lg p-2 shadow-md sm:py-2"
>
  <div class="flex-1 text-center text-xl font-bold">
    <span>Players:</span>
    {$currentPlayerCount}/{$requiredPlayerCount}
  </div>

  {#if $isInQueue}
    <button class="pre-ready-up-button" in:fade={{ duration: 100 }} out:fade={{ duration: 75 }}>
      <IconCoffee size={18} stroke={2.5} />
      Pre-ready up
    </button>
  {/if}
</div>

<style lang="postcss">
  .pre-ready-up-button {
    position: absolute;
    right: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 22px;
    border-radius: 4px;
    background-color: theme('colors.abru.light.85');
    color: theme('colors.abru.dark.3');
    font-size: 14px;
    font-weight: 700;
    gap: 6px;
    line-height: 19px;
    text-transform: uppercase;
    transition-duration: 75ms;
    transition-property: background-color;

    &:hover {
      background-color: darken(theme('colors.abru.light.85'), 4%);
    }
  }
</style>
