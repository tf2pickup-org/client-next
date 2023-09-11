<script lang="ts">
  import { goto } from '$app/navigation';
  import { websiteName } from '$environment';
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import GameList from '$lib/games/components/game-list.svelte';
  import Pagination from '$lib/shared/components/pagination.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const loadPage = (event: CustomEvent<{ page: number }>) => {
    goto(`?page=${event.detail.page}`);
  };
</script>

<svelte:head>
  <title>games • {websiteName}</title>
</svelte:head>

<PageTransition>
  <div class="container mx-auto">
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
