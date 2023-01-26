<script lang="ts">
  import { fetchGame } from '$lib/games/api/fetch-game';
  import type { Game } from '$lib/games/models/game';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  export let data: PageData;

  let game: Game;

  onMount(async () => {
    game = await fetchGame(data.gameId);
  });
</script>

{#if game}
  <div class="container mx-auto">
    <div class="flex flex-row">
      <span class="m-4 text-4xl text-white">
        Pickup #{game.number}
      </span>
    </div>

    <div class="grid grid-cols-4" />
  </div>
{/if}
