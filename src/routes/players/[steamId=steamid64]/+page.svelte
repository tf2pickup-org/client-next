<script lang="ts">
  import { PUBLIC_WEBSITE_NAME } from '$env/static/public';
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import type { Game } from '$lib/games/types/game';
  import { fetchPlayerGames } from '$lib/players/api/fetch-player-games';
  import PlayerGameList from '$lib/players/components/player-game-list.svelte';
  import PlayerPresentation from '$lib/players/components/player-presentation.svelte';
  import type { LinkedProfile } from '$lib/players/types/linked-profile';
  import type { Player } from '$lib/players/types/player';
  import type { PlayerStats } from '$lib/players/types/player-stats';
  import Pagination from '$lib/shared/components/pagination.svelte';
  import type { PaginatedList } from '$lib/shared/types/paginated-list';
  import type { PageData } from './$types';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  export let data: PageData;

  let player = writable<Player>();
  let stats = writable<PlayerStats>();
  let games = writable<PaginatedList<Game>>();
  let linkedProfiles = writable<LinkedProfile[]>();
  let page = data.page;

  $: {
    player.set(data.player);
    linkedProfiles.set(data.linkedProfiles.linkedProfiles);
    data.lazy.stats.then($stats => stats.set($stats));
    data.lazy.games.then($games => games.set($games));
  }

  setContext('player', player);
  setContext('player.stats', stats);
  setContext('player.linkedProfiles', linkedProfiles);

  const loadPage = async (event: CustomEvent<{ page: number }>) => {
    page = event.detail.page;
    const $games = await fetchPlayerGames(
      data.player.steamId,
      (page - 1) * data.gamesPerPage,
      data.gamesPerPage,
    );
    games.set($games);
  };
</script>

<svelte:head>
  <title>{data.player.name} • {PUBLIC_WEBSITE_NAME}</title>
</svelte:head>

<PageTransition>
  <div class="container mx-auto mt-12 flex flex-col gap-[30px]">
    <PlayerPresentation />

    <div class="flex flex-col">
      <div class="text-abru-light-75 text-2xl font-bold">Game history</div>
      <PlayerGameList games={$games} />
      {#if $games}
        <Pagination currentPage={page} itemCount={$games.itemCount} on:pageChange={loadPage} />
      {/if}
    </div>
  </div>
</PageTransition>
