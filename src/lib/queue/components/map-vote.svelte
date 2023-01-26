<script lang="ts">
  import type { MapVoteResult } from '../models/map-vote-result';

  export let mapVoteResults: MapVoteResult[];
</script>

<div class="flex flex-col md:flex-row md:gap-8">
  {#each mapVoteResults as mapVoteResult}
    {@const mapName = mapVoteResult.map.split('_')[1]}
    <button type="button" disabled class="flex-1">
      <div class="my-2 bg-white/70 shadow-md font-caption">
        <div class="flex md:hidden px-2 py-1 justify-between">
          <span>{mapVoteResult.map}</span>
          <span>{mapVoteResult.voteCount}</span>
        </div>

        <div class="hidden md:flex relative flex-col h-48">
          <img
            src="https://mapthumbnails.tf2pickup.org/unsafe/414x192/{mapName}.jpg"
            sizes="(max-width: 1024px) 380px, 414px"
            srcset="https://mapthumbnails.tf2pickup.org/unsafe/414x192/{mapName}.jpg 414w,
              https://mapthumbnails.tf2pickup.org/unsafe/380x96/{mapName}.jpg 380w"
            alt="{mapVoteResult.map} thumbnail"
            class="absolute top-0 bottom-0 left-0 right-0 h-48"
          />

          <div class="z-10 bg-white/70 text-center text-on-surface text-3xl">
            {mapVoteResult.map}
          </div>

          <div class="flex-grow" />

          <div class="z-10 bg-white/70 text-center text-on-surface text-lg">
            {mapVoteResult.voteCount}
          </div>
        </div>
      </div>
    </button>
  {/each}
</div>
