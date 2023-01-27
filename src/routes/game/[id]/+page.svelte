<script lang="ts">
  import { fetchGame } from '$lib/games/api/fetch-game';
  import GameDetails from '$lib/games/components/game-details.svelte';
  import type { Game } from '$lib/games/models/game';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  export let data: PageData;

  let game: Game;

  onMount(async () => {
    game = await fetchGame(data.gameId);
  });
</script>

<svelte:head>
  {#if game}
    <title>#{game.number} • tf2pickup.pl</title>
  {/if}
</svelte:head>

{#if game}
  <div class="container mx-auto my-2 xl:my-8">
    <GameDetails {game} />
  </div>
{/if}
