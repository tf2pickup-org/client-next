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

<style lang="scss">
  @use 'sass:color';

  .pre-ready-up-button {
    color: theme('colors.abru.dark.3');
    background-color: theme('colors.abru.light.85');
    position: absolute;
    right: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border-radius: 4px;
    padding: 10px 22px;
    font-size: 14px;
    line-height: 19px;
    font-weight: 700;
    text-transform: uppercase;
    transition-property: background-color;
    transition-duration: 75ms;

    &:hover {
      background-color: color.scale(#dddcdd, $lightness: -4%);
    }
  }
</style>
