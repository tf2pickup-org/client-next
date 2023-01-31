<script lang="ts">
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import { fetchGame } from '$lib/games/api/fetch-game';
  import GameDetails from '$lib/games/components/game-details.svelte';
  import type { Game } from '$lib/games/models/game';
  import { socket } from '$lib/io/socket';
  import type { PageData } from './$types';
  import { onDestroy, onMount } from 'svelte';

  export let data: PageData;

  let game: Game;

  const updateGame = (newGame: Game) => {
    game = newGame;
  };

  onMount(async () => {
    socket.on('game updated', updateGame);
    game = await fetchGame(data.gameId);
  });

  onDestroy(() => {
    socket.off('game updated', updateGame);
  });
</script>

<svelte:head>
  {#if game}
    <title>#{game.number} • tf2pickup.pl</title>
  {/if}
</svelte:head>

<PageTransition>
  {#if game}
    <div class="container mx-auto my-2 xl:my-8">
      <GameDetails {game} />
    </div>
  {/if}
</PageTransition>
