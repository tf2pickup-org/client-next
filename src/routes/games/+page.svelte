<script lang="ts">
  import { goto } from '$app/navigation';
  import { PUBLIC_WEBSITE_NAME } from '$env/static/public';
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
</svelte:head>

<PageTransition>
  <div class="container mx-auto">
    <PageHeader>Games</PageHeader>

    {#if data.games}
      <GameList games={data.games} />
    {/if}

    <div>
      <Pagination
        currentPage={data.page}
        itemCount={data.games.itemCount}
        on:pageChange={loadPage}
      />
    </div>
  </div>
</PageTransition>
