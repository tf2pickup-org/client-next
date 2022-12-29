<script lang="ts">
  import type { MapVoteResult } from '../models/map-vote-result';

  export let mapVoteResults: MapVoteResult[];
</script>

<div class="flex flex-col md:flex-row md:justify-around">
  {#each mapVoteResults as mapVoteResult}
    {@const mapName = mapVoteResult.map.split('_')[1]}
    <button type="button" disabled>
      <div class="bg-white/70 rounded-2xl p-2 my-2">
        <div class="w-full md:w-[450px] h-[100px] md:h-[150px] relative flex flex-col">
          <img
            src="https://mapthumbnails.tf2pickup.org/unsafe/450x150/{mapName}.jpg"
            sizes="(max-width: 1024px) 380px, 450px"
            srcset="https://mapthumbnails.tf2pickup.org/unsafe/450x150/{mapName}.jpg 450w,
              https://mapthumbnails.tf2pickup.org/unsafe/380x100/{mapName}.jpg 380w"
            alt="{mapVoteResult.map} thumbnail"
            class="absolute top-0 bottom-0 left-0 right-0 rounded-lg md:w-[450px] h-[100px] md:h-[150px]"
          />

          <div class="text-center z-10 bg-slate-900/70 text-white font-semibold rounded-t-lg">
            {mapVoteResult.map}
          </div>

          <div class="flex-grow" />

          <div class="text-center z-10 bg-slate-900/70 text-white font-semibold rounded-b-lg">
            {mapVoteResult.voteCount}
          </div>
        </div>
      </div>
    </button>
  {/each}
</div>
