<script lang="ts">
  import { PUBLIC_WEBSITE_NAME, PUBLIC_WEBSITE_URL } from '$env/static/public';
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import type { Player } from '$lib/players/types/player';
  import PageHeader from '$lib/shared/components/page-header.svelte';
  import type { PageData } from './$types';
  import { groupPlayers } from './group-players';
  import PlayerGroup from './player-group.svelte';

  export let data: PageData;

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const groups = ['#', ...alpha.map(x => String.fromCharCode(x))];

  let playersGrouped: Map<string, Player[]>;

  $: playersGrouped = groupPlayers(data.players);
</script>

<svelte:head>
  <title>players • {PUBLIC_WEBSITE_NAME}</title>
  <meta name="description" content="{PUBLIC_WEBSITE_NAME} player list" />
  <link rel="canonical" href="{PUBLIC_WEBSITE_URL}/players" />

  <meta property="og:url" content="{PUBLIC_WEBSITE_URL}/players" />
  <meta property="og:title" content={PUBLIC_WEBSITE_NAME} />
  <meta property="og:description" content="{PUBLIC_WEBSITE_NAME} player list" />
  <meta property="og:image" content="{PUBLIC_WEBSITE_URL}/favicon.png" />
  <meta property="og:image:alt" content="tf2pickup.pl icon" />
  <meta property="og:image:width" content="256" />
  <meta property="og:image:height" content="256" />
</svelte:head>

<PageTransition>
  <div class="container mx-auto px-4 md:px-0">
    <PageHeader>Players</PageHeader>

    <div class="hidden flex-row justify-between text-2xl font-bold text-abru-light-75 md:flex">
      {#each groups as letter}
        <a href="#{letter}" style="uppercase">{letter}</a>
      {/each}
    </div>

    {#each groups as letter}
      <div class="my-4 h-[2px] bg-abru-light-15" />
      <div
        class="grid min-h-[120px] grid-cols-3 gap-x-2 text-abru-light-75 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10"
      >
        <a id={letter} class="text-[64px] font-bold leading-none">{letter}</a>
        <PlayerGroup players={playersGrouped.get(letter)} />
      </div>
    {/each}
  </div>
</PageTransition>
