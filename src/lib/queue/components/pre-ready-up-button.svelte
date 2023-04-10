<script lang="ts">
  import { isPreReadied, preReadyTimeout } from '../pre-ready-up.store';
  import { IconCoffee } from '@tabler/icons-svelte';
  import { fade, fly } from 'svelte/transition';

  const formatTimeout = (timeout: number) => {
    const minutes = Math.floor(timeout / 60);
    const seconds = timeout - minutes * 60;
    return `${minutes}:${seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;
  };

  let timeoutText: string;

  $: timeoutText = formatTimeout($preReadyTimeout);
</script>

<button
  class="pre-ready-up-button"
  class:active={$isPreReadied}
  in:fade={{ duration: 100 }}
  out:fade={{ duration: 75 }}
  on:click={() => ($isPreReadied = !$isPreReadied)}
>
  {#if $isPreReadied}
    <span>{timeoutText}</span>
  {:else}
    <IconCoffee size={18} stroke={2.5} />
    <span>Pre-ready up</span>
  {/if}
</button>

<style lang="postcss">
  .pre-ready-up-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-width: 170px;
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

    &.active {
      background-color: theme('colors.abru.light.35');
      color: theme('colors.abru.light.85');
    }
  }
</style>
