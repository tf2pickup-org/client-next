<script lang="ts">
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import { fetchPlayerGames } from '$lib/games/api/fetch-player-games';
  import type { Game } from '$lib/games/models/game';
  import PlayerDetails from '$lib/players/components/player-details.svelte';
  import PlayerStatsAndGames from '$lib/players/components/player-stats-and-games.svelte';
  import type { PaginatedList } from '$lib/shared/models/paginated-list';
  import type { PageData } from './$types';

  export let data: PageData;

  let games: PaginatedList<Game> = data.games;
  let currentPage = 1;

  const loadPage = async (page: number) => {
    games = await fetchPlayerGames(data.player.id, (page - 1) * 10, 10);
    currentPage = page;
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
        stats={data.stats}
        {games}
        playerId={data.player.id}
        {currentPage}
        on:pageChange={event => loadPage(event.detail.page)}
      />
    </div>
  </div>
</PageTransition>
