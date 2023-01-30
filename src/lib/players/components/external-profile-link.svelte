<script lang="ts">
  import { fade } from 'svelte/transition';

  export let href: string | undefined;
</script>

{#if href}
  <a
    {href}
    target="_blank"
    rel="noreferrer"
    class="flex h-[80px] w-[80px] items-center justify-center bg-white transition-colors hover:bg-slate-100"
    in:fade={{ duration: 100 }}
  >
    <slot />
  </a>
{:else}
  <div class="h-[80px] w-[80px] animate-pulse bg-slate-700" in:fade={{ duration: 100 }} />
{/if}
