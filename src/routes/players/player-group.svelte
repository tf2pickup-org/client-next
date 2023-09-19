<script lang="ts">
  import type { Player } from '../../lib/players/types/player';

  export let players: Player[] | undefined;

  let playersSorted: Player[] | undefined;

  $: playersSorted = players?.toSorted((a, b) => a.name.localeCompare(b.name));
</script>

<div class="player-group col-span-9 grid grid-cols-9 content-start">
  {#if playersSorted}
    {#each playersSorted as player}
      <a href="/players/{player.steamId}" class="truncate whitespace-nowrap hover:underline"
        >{player.name}</a
      >
    {/each}
  {/if}
</div>

<style lang="postcss">
  .player-group {
    grid-template-columns: subgrid;
  }
</style>
