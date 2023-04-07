<script lang="ts">
  import { mapVote } from '$lib/profile/profile.store';
  import { isInQueue, mapVoteResults, mapVoteTotalCount } from '../queue.store';
  import MapVoteButton from './map-vote-button.svelte';
</script>

<div class="grid gap-4 md:grid-cols-3">
  {#each $mapVoteResults as { map, voteCount }, i}
    <MapVoteButton
      {map}
      votePercent={Math.round($mapVoteTotalCount > 0 ? voteCount / $mapVoteTotalCount : 0) * 100}
      disabled={!$isInQueue}
      selected={$mapVote === map}
      on:mapVote
    />
  {/each}
</div>
