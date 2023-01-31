<script lang="ts">
  import { getMapName } from '$lib/shared/get-map-name';
  import type { MapVoteResult } from '../models/map-vote-result';
  import { fade } from 'svelte/transition';

  export let mapVoteResults: MapVoteResult[] | undefined;
</script>

<div class="flex flex-col md:flex-row md:gap-8">
  {#if mapVoteResults !== undefined}
    {#each mapVoteResults as mapVoteResult}
      {@const mapName = getMapName(mapVoteResult.map)}
      <button type="button" disabled class="flex-1" in:fade={{ duration: 100 }}>
        <div class="my-2 bg-white/70 font-caption shadow-md">
          <div class="flex justify-between px-2 py-1 md:hidden">
            <span>{mapVoteResult.map}</span>
            <span>{mapVoteResult.voteCount}</span>
          </div>

          <div class="relative hidden h-48 flex-col md:flex">
            <img
              src="https://mapthumbnails.tf2pickup.org/unsafe/414x192/{mapName}.jpg"
              sizes="(max-width: 1024px) 380px, 414px"
              srcset="https://mapthumbnails.tf2pickup.org/unsafe/414x192/{mapName}.jpg 414w,
                https://mapthumbnails.tf2pickup.org/unsafe/380x96/{mapName}.jpg 380w"
              alt="{mapVoteResult.map} thumbnail"
              class="absolute top-0 bottom-0 left-0 right-0 h-48"
            />

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
