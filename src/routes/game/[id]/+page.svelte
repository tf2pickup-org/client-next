<script lang="ts">
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import GameDetails from '$lib/games/components/game-details.svelte';
  import type { Game } from '$lib/games/models/game';
  import { socket } from '$lib/io/socket';
  import type { PageData } from './$types';
  import { onDestroy, onMount } from 'svelte';

  export let data: PageData;

  let game: Game = data.game;

  const updateGame = (newGame: Game) => {
    game = newGame;
  };

  onMount(async () => {
    socket.on('game updated', updateGame);
  });

  onDestroy(() => {
    socket.off('game updated', updateGame);
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
