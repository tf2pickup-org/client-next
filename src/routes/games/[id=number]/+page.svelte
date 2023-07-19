<script lang="ts">
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
  import { writable } from 'svelte/store';

  export let data: PageData;

  let game = writable<Game>();
  let connectInfo = writable<ConnectInfo | undefined>();
  let unmounted = new Subject<void>();

  $: {
    const isRunning = ['created', 'configuring', 'launching', 'started'].includes($game.state);

    if (isRunning && $connectInfo && $game.connectInfoVersion !== $connectInfo.connectInfoVersion) {
      fetchConnectInfo($game.id).then($connectInfo => connectInfo.set($connectInfo));
    }
  }

  onMount(() => {
    gameUpdated
      .pipe(
        filter(_game => _game.id === $game.id),
        takeUntil(unmounted),
      )
      .subscribe(newGame => game.set(newGame));
  });

  onDestroy(() => {
    unmounted.next();
    unmounted.complete();
  });

  game.set(data.game);
  connectInfo.set(data.connectInfo);

  setContext('game', game);
  setContext('game.connectInfo', connectInfo);
</script>

<svelte:head>
  <title>#{$game.number} • tf2pickup.pl</title>
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
