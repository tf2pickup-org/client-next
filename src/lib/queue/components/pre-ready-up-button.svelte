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
  class="fixed bottom-20 right-10 z-50 w-20 bg-amaranth-600 py-2 px-4 shadow-lg transition-colors hover:bg-amaranth-500"
  in:fly={{ y: 50, duration: 200 }}
  out:fade={{ duration: 75 }}
  on:click={() => ($isPreReadied = !$isPreReadied)}
>
  <div class="flex justify-center text-3xl text-white">
    {#if $isPreReadied}
      <span>{timeoutText}</span>
    {:else}
      <IconCoffee size={36} />
    {/if}
  </div>
</button>
