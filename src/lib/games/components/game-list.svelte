<script lang="ts">
  import type { PaginatedList } from '$lib/shared/types/paginated-list';
  import type { Game } from '../types/game';

  export let games: PaginatedList<Game>;
  export let currentPage: number = 1;
</script>

<ol>
  {#each games.results as game (game.id)}
    <li class="text-white">
      <a href="/games/{game.number}">
        #{game.number}
      </a>
    </li>
  {/each}
</ol>
