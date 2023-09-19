<script lang="ts">
  import GameList from '$lib/games/components/game-list.svelte';
  import type { Game } from '$lib/games/types/game';
  import type { PaginatedList } from '$lib/shared/types/paginated-list';

  export let games: PaginatedList<Game> | undefined = undefined;
</script>

{#if games}
  <GameList {games} />
{/if}
