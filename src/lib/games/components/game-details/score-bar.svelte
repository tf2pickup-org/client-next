<script lang="ts">
  import type { Tf2Team } from '$lib/games/models/tf2-team';

  export let score: Partial<Record<Tf2Team, number>> = {};
</script>

<div class="flex flex-row font-caption text-4xl text-white xl:text-6xl">
  <div class="flex flex-1 flex-row flex-nowrap justify-between bg-team-blu p-2 xl:p-6">
    <div class="w-8" />
    <div class="text-center">BLU</div>
    <div class="w-8 text-center">{score.blu ?? ''}</div>
  </div>

  <div class="flex flex-1 flex-row flex-nowrap justify-between bg-team-red p-2 xl:p-6">
    <div class="w-8 text-center">{score.red ?? ''}</div>
    <div class="text-center">RED</div>
    <div class="w-8" />
  </div>
</div>
