<script lang="ts">
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';
  import type { PlayerStats } from '../models/player-stats';

  export let stats: PlayerStats;

  const noTypeCheck = (x: any) => x;
</script>

<div class="rounded-2xl bg-white py-2 text-center text-xl font-semibold text-primary">
  games played total: {stats.gamesPlayed}
</div>

<div class="flex flex-row justify-center">
  {#each Object.entries(stats.classesPlayed) as [gameClass, count]}
    <div class="mx-4 flex flex-row justify-center">
      <GameClassIcon gameClass={noTypeCheck(gameClass)} size={30} />
      <span class="mx-2 text-xl font-semibold text-white">{count}</span>
    </div>
  {/each}
</div>
