<script lang="ts">
  import GameClassIcon from "$lib/shared/components/game-class-icon.svelte";
  import type { PlayerStats } from "../models/player-stats";

  export let stats: PlayerStats;

  const noTypeCheck = (x: any) => x;
</script>

<div class="rounded-2xl bg-white text-primary font-semibold text-xl text-center py-2 mx-5 my-2">
  games played total: {stats.gamesPlayed}
</div>

<div class="flex flex-row justify-center my-2">
  {#each Object.entries(stats.classesPlayed) as [gameClass, count]}
    <div class="flex flex-row justify-center mx-4">
      <GameClassIcon gameClass={noTypeCheck(gameClass)} size={30} />
      <span class="text-xl text-white font-semibold mx-2">{count}</span>
    </div>
  {/each}
</div>
