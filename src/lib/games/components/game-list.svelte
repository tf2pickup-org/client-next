<script lang="ts">
  import type { PaginatedList } from '$lib/shared/types/paginated-list';
  import type { Game } from '../types/game';
  import GameListItem from './game-list-item.svelte';

  export let games: PaginatedList<Game>;
</script>

<ol>
  {#each games.results as game (game.id)}
    <li class="my-3">
      <GameListItem {...game} />
    </li>
  {/each}
</ol>
