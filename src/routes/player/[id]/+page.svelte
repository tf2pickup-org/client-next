<script lang="ts">
  import { apiUrl } from '$environment';
  import type { Game } from '$lib/games/models/game';
  import { fetchPlayer } from '$lib/players/api/fetch-player';
  import { fetchPlayerStats } from '$lib/players/api/fetch-player-stats';
  import PlayerDetails from '$lib/players/components/player-details.svelte';
  import PlayerStatsAndGames from '$lib/players/components/player-stats-and-games.svelte';
  import type { Player } from '$lib/players/models/player';
  import type { PlayerStats as PlayerStatsType } from '$lib/players/models/player-stats';
  import type { PaginatedList } from '$lib/shared/models/paginated-list';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  export let data: PageData;

  let player: Player;
  let stats: PlayerStatsType;
  let games: PaginatedList<Game>;

  onMount(async () => {
    await Promise.all([
      (async () => (player = await fetchPlayer(data.playerId)))(),
      (async () => (stats = await fetchPlayerStats(data.playerId)))(),
    ]);

    const res = await fetch(`${apiUrl}/games?playerId=${player.id}`);
    if (res.ok) {
      games = await res.json();
    }
  });
</script>

<svelte:head>
  {#if player}
    <title>{player.name} • tf2pickup.pl</title>
  {/if}
</svelte:head>

{#if player}
  <div class="container mx-auto mt-5 flex flex-col flex-nowrap gap-4 xl:flex-row">
    <div class="flex-1">
      <PlayerDetails {player} />
    </div>

    <div class="flex-1">
      {#if stats}
        <PlayerStatsAndGames {stats} {games} playerId={player.id} />
      {/if}
    </div>
  </div>
{/if}
