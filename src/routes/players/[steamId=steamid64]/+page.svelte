<script lang="ts">
  import { PUBLIC_WEBSITE_NAME, PUBLIC_WEBSITE_URL } from '$env/static/public';
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
  setContext('player.games', games);

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
  <title>{$player.name} • {PUBLIC_WEBSITE_NAME}</title>
  <meta name="description" content="{$player.name}'s profile on {PUBLIC_WEBSITE_NAME}" />
  <link rel="canonical" href="{PUBLIC_WEBSITE_URL}/players/{$player.steamId}" />

  <meta property="og:url" content="{PUBLIC_WEBSITE_URL}/players/{$player.steamId}" />
  <meta property="og:title" content={PUBLIC_WEBSITE_NAME} />
  <meta property="og:description" content="{$player.name}'s profile on {PUBLIC_WEBSITE_NAME}" />
  <meta property="og:image" content={$player.avatar.large} />
  <meta property="og:image:alt" content="{$player.name}'s avatar" />
  <meta property="og:image:width" content="184" />
  <meta property="og:image:height" content="184" />
</svelte:head>

<PageTransition>
  <div class="container mx-auto mt-12 flex flex-col gap-[30px]">
    <PlayerPresentation />

    <div class="flex flex-col">
      {#if $games?.itemCount > 0}
        <div class="text-abru-light-75 mb-4 text-2xl font-bold">Game history</div>
        <PlayerGameList />
        <Pagination
          currentPage={page}
          itemCount={$games.itemCount}
          itemsPerPage={data.gamesPerPage}
          on:pageChange={loadPage}
        />
      {/if}
    </div>
  </div>
</PageTransition>
