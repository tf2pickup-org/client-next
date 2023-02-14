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
    <div class="mt-1 mb-px inline-block h-6 w-48 animate-pulse rounded bg-slate-700" />
  {/if}
</div>

<div class="flex flex-row justify-center">
  {#if stats && stats.classesPlayed}
    {#each Object.entries(stats.classesPlayed) as [gameClass, count]}
      <div class="mx-4 flex flex-row justify-center">
        <GameClassIcon gameClass={noTypeCheck(gameClass)} size={30} />
        <span class="mx-2 font-caption text-xl">{count}</span>
      </div>
    {/each}
  {:else}
    <div class="mb-[2px] grid animate-pulse grid-cols-4 gap-4">
      <div class="flex flex-row items-center space-x-2">
        <div class="h-7 w-7 rounded-full bg-slate-700" />
        <div class="h-4 w-16 rounded bg-slate-700" />
      </div>
      <div class="flex flex-row items-center space-x-2">
        <div class="h-7 w-7 rounded-full bg-slate-700" />
        <div class="h-4 w-16 rounded bg-slate-700" />
      </div>
      <div class="flex flex-row items-center space-x-2">
        <div class="h-7 w-7 rounded-full bg-slate-700" />
        <div class="h-4 w-16 rounded bg-slate-700" />
      </div>
      <div class="flex flex-row items-center space-x-2">
        <div class="h-7 w-7 rounded-full bg-slate-700" />
        <div class="h-4 w-16 rounded bg-slate-700" />
      </div>
    </div>
  {/if}
</div>
