<script lang="ts">
  import MapThumbnail from '$lib/shared/components/map-thumbnail.svelte';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let map: string;
  export let votePercent: number;
  export let disabled = true;
  export let selected = false;

  const dispatch = createEventDispatcher();
</script>

<button
  type="button"
  class="aspect-3/1 map-vote-button relative box-border flex flex-1 flex-col items-start overflow-hidden rounded-lg p-[13px] text-white"
  {disabled}
  on:click={() => dispatch('mapVote', { map })}
>
  <div class="grow" />
  <span class="text-2xl font-bold leading-4">{votePercent}%</span>
  <span class="text-2xl font-normal">
    {map}
  </span>

  <div class="absolute bottom-0 left-1/3 right-0 top-0 -z-10">
    <MapThumbnail {map} />
  </div>

  {#if selected}
    <div
      class="absolute bottom-0 left-0 right-0 top-0 z-10 rounded-lg border-4 border-white"
      in:fade={{ duration: 100 }}
      out:fade={{ duration: 50 }}
    />
  {/if}
</button>

<style lang="scss">
  .map-vote-button {
    background: theme('colors.abru.light.25');
    background: linear-gradient(
      90deg,
      theme('colors.abru.light.25') 35%,
      theme('colors.transparent') 90%
    );

    &:hover:enabled {
      background: linear-gradient(
        90deg,
        theme('colors.abru.light.30') 35%,
        theme('colors.transparent') 90%
      );
    }
  }
</style>
