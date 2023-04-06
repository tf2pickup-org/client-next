<script lang="ts">
  import { getMapName } from '../get-map-name';
  import { IconPhotoOff } from '@tabler/icons-svelte';

  export let map: string;

  let width: number, height: number;
  let src: string;
  let thumbnailExists = true;
  let thumbnailLoaded = false;
  $: src = `https://mapthumbnails.tf2pickup.org/unsafe/${width}x${height}/${getMapName(map)}.jpg`;
</script>

<div
  bind:clientWidth={width}
  bind:clientHeight={height}
  class="flex h-full w-full items-center justify-center text-slate-700"
>
  {#if thumbnailExists}
    <img
      {src}
      loading="lazy"
      alt="{map} thumbnail"
      class="transition-opacity"
      class:opacity-0={!thumbnailLoaded}
      on:load={() => (thumbnailLoaded = true)}
      on:error={() => (thumbnailExists = false)}
    />
  {:else}
    <IconPhotoOff size={48} />
  {/if}
</div>
