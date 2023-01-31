<script lang="ts">
  import type { Game } from '$lib/games/models/game';
  import PlayerGameList from '$lib/players/components/player-game-list.svelte';
  import type { PlayerStats as PlayerStatsType } from '$lib/players/models/player-stats';
  import Pagination from '$lib/shared/components/pagination.svelte';
  import type { PaginatedList } from '$lib/shared/models/paginated-list';
  import PlayerStats from './player-stats.svelte';

  export let stats: PlayerStatsType;
  export let games: PaginatedList<Game>;
  export let playerId: string;
  export let currentPage: number = 1;
</script>

<div class="mx-2 flex flex-col gap-4 bg-white/80 p-2">
  <PlayerStats {stats} />
  <PlayerGameList games={games.results} {playerId} />
</div>

{#if stats}
  <Pagination {currentPage} itemsPerPage={10} itemCount={stats.gamesPlayed} on:pageChange />
{/if}
