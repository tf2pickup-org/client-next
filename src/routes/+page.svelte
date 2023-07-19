<script lang="ts">
  import { websiteName } from '$environment';
  import Alerts from '$lib/core/components/alerts.svelte';
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import OnlinePlayerList from '$lib/players/components/online-player-list.svelte';
  import { joinQueue } from '$lib/queue/api/join-queue';
  import { leaveQueue } from '$lib/queue/api/leave-queue';
  import { markAsFriend } from '$lib/queue/api/mark-as-friend';
  import { voteForMap } from '$lib/queue/api/vote-for-map';
  import MapVote from '$lib/queue/components/map-vote.svelte';
  import Queue from '$lib/queue/components/queue.svelte';
  import { queue, currentPlayerCount, requiredPlayerCount } from '$lib/queue/queue.store';
  import StreamList from '$lib/streams/components/stream-list.svelte';
</script>

<svelte:head>
  <title>[{$currentPlayerCount}/{$requiredPlayerCount}] {websiteName}</title>
</svelte:head>

<PageTransition>
  <div class="container mx-auto my-4 grid gap-x-4 gap-y-8 p-2 lg:grid-cols-4 lg:p-0">
    <div class="order-1 lg:col-span-4">
      <Alerts />
    </div>

    <div class="order-2 lg:col-span-3">
      {#if $queue}
        <Queue
          on:joinQueue={event => joinQueue(event.detail.slotId)}
          on:leaveQueue={() => leaveQueue()}
          on:markAsFriend={event => markAsFriend(event.detail.friendPlayerId)}
        />
      {/if}
    </div>

    <div class="order-4 lg:col-span-3">
      {#if $queue}
        <MapVote on:mapVote={event => voteForMap(event.detail.map)} />
      {/if}
    </div>

    <div class="order-last lg:order-3 lg:row-span-2">
      <OnlinePlayerList />
    </div>

    <div class="order-5 lg:col-span-4">
      <StreamList />
    </div>
  </div>
</PageTransition>
