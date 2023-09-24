<script lang="ts">
  import { PUBLIC_WEBSITE_NAME, PUBLIC_WEBSITE_URL } from '$env/static/public';
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import PageHeader from '$lib/shared/components/page-header.svelte';
  import type { PageData } from './$types';
  import Board from './board.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>hall of fame • {PUBLIC_WEBSITE_NAME}</title>
  <meta name="description" content="{PUBLIC_WEBSITE_NAME} hall of fame" />
  <link rel="canonical" href="{PUBLIC_WEBSITE_URL}/hall-of-fame" />

  <meta property="og:url" content="{PUBLIC_WEBSITE_URL}/hall-of-fame" />
  <meta property="og:title" content={PUBLIC_WEBSITE_NAME} />
  <meta property="og:description" content="{PUBLIC_WEBSITE_NAME} hall of fame" />
  <meta property="og:image" content="{PUBLIC_WEBSITE_URL}/favicon.png" />
  <meta property="og:image:alt" content="tf2pickup.pl icon" />
  <meta property="og:image:width" content="256" />
  <meta property="og:image:height" content="256" />
</svelte:head>

<PageTransition>
  <div class="container mx-auto grid grid-cols-2 gap-x-4">
    <div class="col-span-2">
      <PageHeader>Hall of fame</PageHeader>
    </div>
    <Board title="All classes" records={data.mostActivePlayers} />
    <Board title="Medics" records={data.mostActiveMedics} />
  </div>
</PageTransition>
