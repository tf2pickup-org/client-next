<script lang="ts">
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import { fetchPlayerGames } from '$lib/games/api/fetch-player-games';
  import type { Game } from '$lib/games/models/game';
  import { fetchPlayerStats } from '$lib/players/api/fetch-player-stats';
  import PlayerDetails from '$lib/players/components/player-details.svelte';
  import PlayerStatsAndGames from '$lib/players/components/player-stats-and-games.svelte';
  import type { PlayerStats } from '$lib/players/models/player-stats';
  import type { PaginatedList } from '$lib/shared/models/paginated-list';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  export let data: PageData;

  let stats: PlayerStats;
  let games: PaginatedList<Game>;
  let loading = true;
  let currentPage = 1;

  onMount(async () => {
    [stats, games] = await Promise.all([
      fetchPlayerStats(data.player.id),
      fetchPlayerGames(data.player.id),
    ]);
    loading = false;
  });

  const loadPage = async (page: number) => {
    loading = true;
    games = await fetchPlayerGames(data.player.id, (page - 1) * 10, 10);
    currentPage = page;
    loading = false;
  };
</script>

<svelte:head>
  <title>{data.player.name} • tf2pickup.pl</title>
</svelte:head>

<PageTransition>
  <div class="container mx-auto mt-5 flex flex-col flex-nowrap gap-4 xl:flex-row">
    <div class="flex-1">
      <PlayerDetails player={data.player} linkedProfiles={data.linkedProfiles} />
    </div>

    <div class="flex-1">
      <PlayerStatsAndGames
        {stats}
        {games}
        playerId={data.player.id}
        {currentPage}
        {loading}
        on:pageChange={event => loadPage(event.detail.page)}
      />
    </div>
  </div>
</PageTransition>
