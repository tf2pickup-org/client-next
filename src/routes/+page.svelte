<script lang="ts">
  import { websiteName } from '$environment';
  import OnlinePlayerList from '$lib/players/components/online-player-list.svelte';
  import MapVote from '$lib/queue/components/map-vote.svelte';
  import Queue from '$lib/queue/components/queue.svelte';
  import { queue, currentPlayerCount, requiredPlayerCount } from '$lib/queue/queue.store';
</script>

<svelte:head>
  <title>[{$currentPlayerCount}/{$requiredPlayerCount}] {websiteName}</title>
</svelte:head>

<div class="container mx-auto my-4 grid gap-x-4 gap-y-8 lg:grid-cols-4">
  <div class="order-1 lg:col-span-3">
    {#if $queue}
      <Queue />
    {/if}
  </div>

  <div class="order-3 lg:col-span-3">
    {#if $queue}
      <MapVote />
    {/if}
  </div>

  <div class="order-last lg:order-2 lg:row-span-2">
    <OnlinePlayerList />
  </div>
</div>
