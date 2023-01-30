<script lang="ts">
  import type { Game } from '$lib/games/models/game';
  import PlayerGameList from '$lib/players/components/player-game-list.svelte';
  import type { PlayerStats as PlayerStatsType } from '$lib/players/models/player-stats';
  import type { PaginatedList } from '$lib/shared/models/paginated-list';
  import PlayerStats from './player-stats.svelte';

  export let stats: PlayerStatsType | undefined = undefined;
  export let games: PaginatedList<Game> | undefined = undefined;
  export let playerId: string | undefined = undefined;
</script>

<div class="mx-2 flex flex-col gap-4 bg-white/80 p-2">
  <PlayerStats {stats} />

  {#if games && playerId}
    <PlayerGameList games={games.results} {playerId} />
  {/if}
</div>
