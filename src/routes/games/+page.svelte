<script lang="ts">
  import { goto } from '$app/navigation';
  import { PUBLIC_WEBSITE_NAME, PUBLIC_WEBSITE_URL } from '$env/static/public';
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import GameList from '$lib/games/components/game-list.svelte';
  import PageHeader from '$lib/shared/components/page-header.svelte';
  import Pagination from '$lib/shared/components/pagination.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const loadPage = (event: CustomEvent<{ page: number }>) => {
    goto(`?page=${event.detail.page}`);
  };
</script>

<svelte:head>
  <title>games • {PUBLIC_WEBSITE_NAME}</title>
  <meta name="description" content="{PUBLIC_WEBSITE_NAME} game list" />
  <link rel="canonical" href="{PUBLIC_WEBSITE_URL}/games" />

  <meta property="og:url" content="{PUBLIC_WEBSITE_URL}/games" />
  <meta property="og:title" content={PUBLIC_WEBSITE_NAME} />
  <meta property="og:description" content="{PUBLIC_WEBSITE_NAME} game list" />
  <meta property="og:image" content="{PUBLIC_WEBSITE_URL}/favicon.png" />
  <meta property="og:image:alt" content="tf2pickup.pl icon" />
  <meta property="og:image:width" content="256" />
  <meta property="og:image:height" content="256" />
</svelte:head>

<PageTransition>
  <div class="container mx-auto p-2 lg:p-0">
    <PageHeader>Games</PageHeader>

    {#if data.games}
      <GameList games={data.games.results} />
    {/if}

    <div>
      <Pagination
        currentPage={data.page}
        itemCount={data.games.itemCount}
        itemsPerPage={data.gamesPerPage}
        on:pageChange={loadPage}
      />
    </div>
  </div>
</PageTransition>
