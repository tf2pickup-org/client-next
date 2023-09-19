<script lang="ts">
  import type { PaginatedList } from '$lib/shared/types/paginated-list';
  import type { Game } from '../types/game';
  import GameListItem from './game-list-item.svelte';

  export let games: PaginatedList<Game>;
</script>

<div class="game-list">
  {#each games.results as game (game.id)}
    <GameListItem {...game} />
  {/each}
</div>

<style lang="postcss">
  .game-list {
    display: grid;
    grid-template-columns: repeat(6, auto) 1fr;
    column-gap: 8px;
    row-gap: 10px;
  }
</style>
