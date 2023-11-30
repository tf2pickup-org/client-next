<script lang="ts">
  import { PUBLIC_WEBSITE_NAME, PUBLIC_WEBSITE_URL } from '$env/static/public';
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import { fetchConnectInfo } from '$lib/games/api/fetch-connect-info';
  import GameSummary from './game-summary.svelte';
  import { gameUpdated } from '$lib/games/game.events';
  import type { ConnectInfo } from '$lib/games/types/connect-info';
  import type { Game } from '$lib/games/types/game';
  import type { PageData } from './$types';
  import { Subject, filter, fromEvent, takeUntil } from 'rxjs';
  import { onDestroy, onMount, setContext } from 'svelte';
  import { get, writable } from 'svelte/store';
  import GameSlotList from './game-slot-list.svelte';
  import { replacePlayer } from '$lib/games/api/replace-player';
  import type { GameEvent } from '$lib/games/types/game-event';
  import GameEventList from './game-event-list.svelte';
  import FadeScroll from '$lib/shared/components/fade-scroll.svelte';
  import { socket } from '$lib/io/socket';
  import { joinRoom } from '$lib/io/api/join-room';
  import { leaveRoom } from '$lib/io/api/leave-room';

  export let data: PageData;

  const room = `/games/${data.game.number}/events`;

  let game = writable<Game>();
  let events = writable<GameEvent[]>();
  let connectInfo = writable<ConnectInfo | undefined>();
  let unmounted = new Subject<void>();

  fromEvent<GameEvent[]>(socket, 'events updated')
    .pipe(takeUntil(unmounted))
    .subscribe($events => events.set($events));

  $: {
    game.set(data.game);
    events.set(data.events);
    connectInfo.set(data.connectInfo);
  }

  onMount(() => {
    gameUpdated
      .pipe(
        filter(_game => _game.id === $game.id),
        takeUntil(unmounted),
      )
      .subscribe($game => {
        game.set($game);

        const isRunning = ['created', 'configuring', 'launching', 'started'].includes($game.state);
        const $connectInfo = get(connectInfo);

        if (
          data.isMyGame &&
          isRunning &&
          $game.connectInfoVersion !== $connectInfo?.connectInfoVersion
        ) {
          fetchConnectInfo($game.id).then($connectInfo => connectInfo.set($connectInfo));
        }
      });

    joinRoom(room);
  });

  onDestroy(() => {
    leaveRoom(room);
    unmounted.next();
    unmounted.complete();
  });

  setContext('game', game);
  setContext('game.events', events);
  setContext('game.connectInfo', connectInfo);
</script>

<svelte:head>
  <title>#{$game.number} • {PUBLIC_WEBSITE_NAME}</title>
  <meta name="description" content="game #{$game.number} details" />
  <link rel="canonical" href="{PUBLIC_WEBSITE_URL}/games/{$game.number}" />

  <meta property="og:url" content="{PUBLIC_WEBSITE_URL}/games/{$game.number}" />
  <meta property="og:title" content={PUBLIC_WEBSITE_NAME} />
  <meta property="og:description" content="game #{$game.number} details" />
  <meta property="og:image" content="{PUBLIC_WEBSITE_URL}/favicon.png" />
  <meta property="og:image:alt" content="tf2pickup.pl icon" />
  <meta property="og:image:width" content="256" />
  <meta property="og:image:height" content="256" />
</svelte:head>

<PageTransition>
  <div class="container mx-auto mt-12 grid grid-cols-8 gap-x-4">
    <div class="order-first col-span-2 flex flex-col">
      <GameSummary />

      <span class="col-span-2 mb-4 mt-8 text-2xl font-bold text-white">Game events</span>

      <div class="h-[260px]">
        <FadeScroll>
          <GameEventList />
        </FadeScroll>
      </div>
    </div>

    <div class="col-span-6">
      <GameSlotList
        on:replacePlayer={event => replacePlayer(event.detail.gameId, event.detail.replaceeId)}
      />
    </div>
  </div>
</PageTransition>
