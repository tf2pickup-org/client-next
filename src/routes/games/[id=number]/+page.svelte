<script lang="ts">
  import { PUBLIC_WEBSITE_NAME, PUBLIC_WEBSITE_URL } from '$env/static/public';
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import { fetchConnectInfo } from '$lib/games/api/fetch-connect-info';
  import GameSummary from '$lib/games/components/game-summary.svelte';
  import TeamPlayerList from '$lib/games/components/team-player-list.svelte';
  import { gameUpdated } from '$lib/games/game.events';
  import type { ConnectInfo } from '$lib/games/types/connect-info';
  import type { Game } from '$lib/games/types/game';
  import type { PageData } from './$types';
  import { Subject, filter, takeUntil } from 'rxjs';
  import { onDestroy, onMount, setContext } from 'svelte';
  import { get, writable } from 'svelte/store';

  export let data: PageData;

  let game = writable<Game>();
  let connectInfo = writable<ConnectInfo | undefined>();
  let unmounted = new Subject<void>();

  $: {
    game.set(data.game);
    connectInfo.set(data.connectInfo);
  }

  onMount(() => {
    gameUpdated
      .pipe(
        filter(_game => _game.id === $game.id),
        takeUntil(unmounted),
      )
      .subscribe($game => {
        console.log($game.connectInfoVersion);
        game.set($game);

        const isRunning = ['created', 'configuring', 'launching', 'started'].includes($game.state);
        const $connectInfo = get(connectInfo);

        if (
          data.isMyGame &&
          isRunning &&
          $game.connectInfoVersion !== $connectInfo?.connectInfoVersion
        ) {
          fetchConnectInfo($game.id).then($connectInfo => {
            console.log($connectInfo);
            connectInfo.set($connectInfo);
          });
        }
      });
  });

  onDestroy(() => {
    unmounted.next();
    unmounted.complete();
  });

  setContext('game', game);
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
    <div class="order-first col-span-2">
      <GameSummary />
    </div>

    <div class="col-span-3">
      <TeamPlayerList team="blu" />
    </div>

    <div class="col-span-3">
      <TeamPlayerList team="red" />
    </div>
  </div>
</PageTransition>
