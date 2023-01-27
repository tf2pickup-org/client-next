<script lang="ts">
  import { apiUrl } from '$environment';
  import GameList from '$lib/games/components/game-list.svelte';
  import type { Game } from '$lib/games/models/game';
  import type { PaginatedList } from '$lib/shared/models/paginated-list';
  import { onMount } from 'svelte';

  let games: PaginatedList<Game>;

  onMount(async () => {
    const res = await fetch(`${apiUrl}/games?limit=5`);
    if (res.ok) {
      games = await res.json();
    }
  });
</script>

<svelte:head>
  <title>games • tf2pickup.pl</title>
</svelte:head>

<div class="container mx-auto my-12">
  {#if games}
    <GameList {games} />
  {/if}
</div>
