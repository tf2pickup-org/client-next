<script lang="ts">
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';
  import type { PlayerStats } from '../models/player-stats';

  export let stats: PlayerStats | undefined;

  const noTypeCheck = (x: any) => x;
</script>

<div class="self-center font-caption">
  {#if stats}
    <span class="text-2xl">Games played total: </span>
    <span class="ml-2 text-3xl">{stats.gamesPlayed}</span>
  {:else}
    <div class="inline-block h-7 w-48 animate-pulse bg-slate-700" />
  {/if}
</div>

{#if stats?.classesPlayed}
  <div class="flex flex-row justify-center">
    {#each Object.entries(stats.classesPlayed) as [gameClass, count]}
      <div class="mx-4 flex flex-row justify-center">
        <GameClassIcon gameClass={noTypeCheck(gameClass)} size={30} />
        <span class="mx-2 font-caption text-xl">{count}</span>
      </div>
    {/each}
  </div>
{/if}
