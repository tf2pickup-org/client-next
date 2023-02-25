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
  {disabled}
  class="flex-1 outline outline-2 outline-offset-4 transition-colors duration-100 {selected
    ? 'outline-white'
    : 'outline-transparent'}"
  in:fade={{ duration: 100 }}
  on:click={() => dispatch('mapVote', { map })}
>
  <div class="bg-white/70 font-caption text-2xl shadow-md">
    <div class="flex justify-between px-2 py-1 md:hidden">
      <span>{map}</span>
      {#key votePercent}
        <span class="animate-pulsate">{votePercent}%</span>
      {/key}
    </div>

    <div class="relative hidden aspect-video flex-col justify-end md:flex">
      <div class="absolute top-0 bottom-0 left-0 right-0">
        <MapThumbnail {map} />
      </div>

      <div
        class="z-10 flex flex-row justify-between bg-white/60 py-2 px-4 text-center text-lg text-fogra-900 lg:text-xl xl:text-2xl"
      >
        <span>{map}</span>
        {#key votePercent}
          <span class="animate-pulsate">{votePercent}%</span>
        {/key}
      </div>
    </div>
  </div>
</button>
