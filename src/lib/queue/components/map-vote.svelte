<script lang="ts">
  import MapThumbnail from '$lib/shared/components/map-thumbnail.svelte';
  import type { MapVoteResult } from '../models/map-vote-result';
  import { fade } from 'svelte/transition';

  export let mapVoteResults: MapVoteResult[] | undefined;
</script>

<div class="flex flex-col gap-2 md:flex-row md:gap-8">
  {#if mapVoteResults !== undefined}
    {#each mapVoteResults as mapVoteResult}
      <button type="button" disabled class="flex-1" in:fade={{ duration: 100 }}>
        <div class="bg-white/70 font-caption shadow-md">
          <div class="flex justify-between px-2 py-1 md:hidden">
            <span>{mapVoteResult.map}</span>
            <span>{mapVoteResult.voteCount}</span>
          </div>

          <div class="relative hidden aspect-video flex-col md:flex">
            <div class="absolute top-0 bottom-0 left-0 right-0">
              <MapThumbnail map={mapVoteResult.map} />
            </div>

            <div class="z-10 bg-white/70 text-center text-xl text-on-surface 2xl:text-3xl">
              {mapVoteResult.map}
            </div>

            <div class="flex-grow" />

            <div class="z-10 bg-white/70 text-center text-lg text-on-surface">
              {mapVoteResult.voteCount}
            </div>
          </div>
        </div>
      </button>
    {/each}
  {:else}
    <div class="my-2 flex-1 animate-pulse bg-slate-700 shadow-md md:h-48" />
    <div class="my-2 flex-1 animate-pulse bg-slate-700 shadow-md md:h-48" />
    <div class="my-2 flex-1 animate-pulse bg-slate-700 shadow-md md:h-48" />
  {/if}
</div>
