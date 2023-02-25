<script lang="ts">
  import { mapVote } from '$lib/profile/profile.store';
  import { mapVoteTotalCount, isInQueue, mapVoteResults } from '../queue.store';
  import MapVoteButton from './map-vote-button.svelte';
</script>

<div class="flex flex-col gap-2 md:flex-row md:gap-8">
  {#if $mapVoteResults !== undefined}
    {#each $mapVoteResults as { map, voteCount }}
      <MapVoteButton
        {map}
        votePercent={Math.round($mapVoteTotalCount > 0 ? voteCount / $mapVoteTotalCount : 0) * 100}
        disabled={!isInQueue}
        selected={$mapVote === map}
        on:mapVote
      />
    {/each}
  {:else}
    <div class="my-2 flex-1 animate-pulse bg-slate-700 shadow-md md:h-48" />
    <div class="my-2 flex-1 animate-pulse bg-slate-700 shadow-md md:h-48" />
    <div class="my-2 flex-1 animate-pulse bg-slate-700 shadow-md md:h-48" />
  {/if}
</div>
