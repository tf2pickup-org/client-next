<script lang="ts">
  import { fetchPlayerGames } from '$lib/games/api/fetch-player-games';
  import type { Game } from '$lib/games/models/game';
  import { fetchLinkedProfiles } from '$lib/players/api/fetch-linked-profiles';
  import { fetchPlayer } from '$lib/players/api/fetch-player';
  import { fetchPlayerStats } from '$lib/players/api/fetch-player-stats';
  import PlayerDetails from '$lib/players/components/player-details.svelte';
  import PlayerStatsAndGames from '$lib/players/components/player-stats-and-games.svelte';
  import type { LinkedProfiles } from '$lib/players/models/linked-profiles';
  import type { Player } from '$lib/players/models/player';
  import type { PlayerStats as PlayerStatsType } from '$lib/players/models/player-stats';
  import type { PaginatedList } from '$lib/shared/models/paginated-list';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  export let data: PageData;

  let player: Player;
  let stats: PlayerStatsType;
  let games: PaginatedList<Game>;
  let linkedProfiles: LinkedProfiles;

  onMount(async () => {
    await Promise.all([
      (async () => (player = await fetchPlayer(data.playerId)))(),
      (async () => (stats = await fetchPlayerStats(data.playerId)))(),
    ]);

    games = await fetchPlayerGames(player.id);
    linkedProfiles = await fetchLinkedProfiles(player);
  });
</script>

<svelte:head>
  {#if player}
    <title>{player.name} • tf2pickup.pl</title>
  {/if}
</svelte:head>

<div class="container mx-auto mt-5 flex flex-col flex-nowrap gap-4 xl:flex-row">
  <div class="flex-1">
    <PlayerDetails {player} {linkedProfiles} />
  </div>

  <div class="flex-1">
    <PlayerStatsAndGames {stats} {games} playerId={player?.id} />
  </div>
</div>
