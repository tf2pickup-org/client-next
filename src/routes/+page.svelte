<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    PUBLIC_WEBSITE_DESCRIPTION,
    PUBLIC_WEBSITE_NAME,
    PUBLIC_WEBSITE_URL,
  } from '$env/static/public';
  import Alerts from '$lib/core/components/alerts.svelte';
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import { gameCreated } from '$lib/games/game.events';
  import OnlinePlayerList from '$lib/players/components/online-player-list.svelte';
  import { profile } from '$lib/profile/profile.store';
  import { joinQueue } from '$lib/queue/api/join-queue';
  import { leaveQueue } from '$lib/queue/api/leave-queue';
  import { markAsFriend } from '$lib/queue/api/mark-as-friend';
  import { voteForMap } from '$lib/queue/api/vote-for-map';
  import MapVote from '$lib/queue/components/map-vote.svelte';
  import Queue from '$lib/queue/components/queue.svelte';
  import { currentPlayerCount, queue, requiredPlayerCount } from '$lib/queue/queue.store';
  import StreamList from '$lib/streams/components/stream-list.svelte';
  import { Subject, takeUntil } from 'rxjs';
  import { onDestroy, onMount } from 'svelte';

  const destroyed: Subject<void> = new Subject();

  onMount(() => {
    gameCreated.pipe(takeUntil(destroyed)).subscribe(game => {
      if (game.slots.some(s => s.player.id === $profile?.player.id)) {
        goto(`/games/${game.number}`);
      }
    });
  });

  onDestroy(() => {
    destroyed.next();
    destroyed.complete();
  });
</script>

<svelte:head>
  <title>[{$currentPlayerCount}/{$requiredPlayerCount}] {PUBLIC_WEBSITE_NAME}</title>
  <meta name="description" content={PUBLIC_WEBSITE_DESCRIPTION} />
  <link rel="canonical" href={PUBLIC_WEBSITE_URL} />

  <meta property="og:url" content={PUBLIC_WEBSITE_URL} />
  <meta property="og:title" content={PUBLIC_WEBSITE_NAME} />
  <meta property="og:description" content={PUBLIC_WEBSITE_DESCRIPTION} />
  <meta property="og:image" content="{PUBLIC_WEBSITE_URL}/favicon.png" />
  <meta property="og:image:alt" content="tf2pickup.pl icon" />
  <meta property="og:image:width" content="256" />
  <meta property="og:image:height" content="256" />
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
