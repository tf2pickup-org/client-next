<script lang="ts">
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import GameDetails from '$lib/games/components/game-details.svelte';
  import { gameUpdated } from '$lib/games/events';
  import type { Game } from '$lib/games/models/game';
  import type { PageData } from './$types';
  import { Subject } from 'rxjs';
  import { filter, takeUntil } from 'rxjs/operators';
  import { onDestroy, onMount } from 'svelte';

  export let data: PageData;

  let game: Game = data.game;
  let unmounted = new Subject<void>();

  onMount(async () => {
    gameUpdated
      .pipe(
        filter(_game => _game.id === game.id),
        takeUntil(unmounted),
      )
      .subscribe(newGame => (game = newGame));
  });

  onDestroy(() => {
    unmounted.next();
    unmounted.unsubscribe();
  });
</script>

<svelte:head>
  <title>#{game.number} • tf2pickup.pl</title>
</svelte:head>

<PageTransition>
  <div class="container mx-auto my-2 xl:my-8">
    <GameDetails {game} />
  </div>
</PageTransition>
