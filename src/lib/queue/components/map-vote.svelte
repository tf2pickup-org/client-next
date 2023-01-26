<script lang="ts">
  import type { MapVoteResult } from '../models/map-vote-result';

  export let mapVoteResults: MapVoteResult[];
</script>

<div class="grid auto-cols-max grid-flow-col gap-8">
  {#each mapVoteResults as mapVoteResult}
    {@const mapName = mapVoteResult.map.split('_')[1]}
    <button type="button" disabled>
      <div class="my-2 rounded-2xl bg-white/70 p-2 shadow-md">
        <div class="relative flex h-[100px] w-full flex-col md:h-[150px] md:w-[450px]">
          <img
            src="https://mapthumbnails.tf2pickup.org/unsafe/450x150/{mapName}.jpg"
            sizes="(max-width: 1024px) 380px, 450px"
            srcset="https://mapthumbnails.tf2pickup.org/unsafe/450x150/{mapName}.jpg 450w,
              https://mapthumbnails.tf2pickup.org/unsafe/380x100/{mapName}.jpg 380w"
            alt="{mapVoteResult.map} thumbnail"
            class="absolute top-0 bottom-0 left-0 right-0 h-[100px] rounded-lg md:h-[150px] md:w-[450px]"
          />

          <div class="z-10 rounded-t-lg bg-slate-900/70 text-center font-semibold text-white">
            {mapVoteResult.map}
          </div>

          <div class="flex-grow" />

          <div class="z-10 rounded-b-lg bg-slate-900/70 text-center font-semibold text-white">
            {mapVoteResult.voteCount}
          </div>
        </div>
      </div>
    </button>
  {/each}
</div>
