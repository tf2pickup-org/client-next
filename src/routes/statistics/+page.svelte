<script lang="ts">
  import { PUBLIC_WEBSITE_NAME, PUBLIC_WEBSITE_URL } from '$env/static/public';
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import PageHeader from '$lib/shared/components/page-header.svelte';
  import type { PageData } from './$types';
  import ChartTitle from './chart-title.svelte';
  import GameLaunchSpansChart from './game-launch-spans-chart.svelte';
  import GameLaunchesPerDayChart from './game-launches-per-day-chart.svelte';
  import MostPlayedMapsChart from './most-played-maps-chart.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>statistics • {PUBLIC_WEBSITE_NAME}</title>
  <meta name="description" content="{PUBLIC_WEBSITE_NAME} statistics" />
  <link rel="canonical" href="{PUBLIC_WEBSITE_URL}/statistics" />

  <meta property="og:url" content="{PUBLIC_WEBSITE_URL}/statistics" />
  <meta property="og:title" content={PUBLIC_WEBSITE_NAME} />
  <meta property="og:description" content="{PUBLIC_WEBSITE_NAME} statistics" />
  <meta property="og:image" content="{PUBLIC_WEBSITE_URL}/favicon.png" />
  <meta property="og:image:alt" content="tf2pickup.pl icon" />
  <meta property="og:image:width" content="256" />
  <meta property="og:image:height" content="256" />
</svelte:head>

<PageTransition>
  <div class="container mx-auto grid grid-cols-1 gap-4 px-2 lg:grid-cols-2">
    <div class="lg:col-span-2">
      <PageHeader>Statistics</PageHeader>
    </div>

    <div class="flex flex-col items-center rounded-lg bg-abru-dark-25 px-12 py-8 lg:row-span-2">
      <ChartTitle>Most played maps</ChartTitle>
      <MostPlayedMapsChart data={data.mostPlayedMaps} />
    </div>

    <div class="flex flex-col gap-2 rounded-lg bg-abru-dark-25 px-6 py-8">
      <ChartTitle>Played games per day</ChartTitle>
      <GameLaunchesPerDayChart data={data.gameLaunchesPerDay} />
    </div>

    <div class="flex flex-col gap-2 rounded-lg bg-abru-dark-25 px-6 py-8">
      <ChartTitle>Game launch times</ChartTitle>
      <GameLaunchSpansChart data={data.gameLaunchSpans} />
    </div>
  </div>
</PageTransition>
