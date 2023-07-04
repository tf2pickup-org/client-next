<script lang="ts">
  import { streams } from '../streams.store';
  import Stream from './stream.svelte';
</script>

{#if $streams.length > 0}
  <div class="grid grid-cols-4 gap-4">
    <span class="col-span-4 text-[32px] font-bold text-white">Now streaming</span>
    {#each $streams as stream}
      <Stream {...stream} />
    {/each}
  </div>
{/if}
