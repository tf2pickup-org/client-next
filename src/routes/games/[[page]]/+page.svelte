<script lang="ts">
  import { goto } from '$app/navigation';
  import { websiteName } from '$environment';
  import GameList from '$lib/games/components/game-list.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const loadPage = (event: CustomEvent<{ page: number }>) => {
    goto(`/games/${event.detail.page}`);
  };
</script>

<svelte:head>
  <title>games • {websiteName}</title>
</svelte:head>

<div class="container mx-auto">
  {#if data.games}
    <GameList games={data.games} currentPage={data.page} />
  {/if}
</div>
