<script lang="ts">
  import { PUBLIC_WEBSITE_NAME } from '$env/static/public';
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
</svelte:head>

<PageTransition>
  <div class="container mx-auto">
    <PageHeader>Players</PageHeader>

    <div class="text-abru-light-75 flex flex-row justify-between text-2xl font-bold">
      {#each groups as letter}
        <a href="#{letter}" style="uppercase">{letter}</a>
      {/each}
    </div>

    {#each groups as letter}
      <div class="bg-abru-light-15 my-4 h-[2px]" />
      <div class="text-abru-light-75 grid min-h-[120px] grid-cols-10 gap-x-2">
        <a id={letter} class="text-[64px] font-bold leading-none">{letter}</a>
        <PlayerGroup players={playersGrouped.get(letter)} />
      </div>
    {/each}
  </div>
</PageTransition>
