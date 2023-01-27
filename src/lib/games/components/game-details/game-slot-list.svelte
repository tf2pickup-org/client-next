<script lang="ts">
  import type { GameSlot as GameSlotType } from '$lib/games/models/game-slot';
  import GameSlot from './game-slot.svelte';

  export let gameSlots: GameSlotType[];
</script>

<div class="flex flex-col flex-nowrap gap-2">
  {#each gameSlots as gameSlot}
    <GameSlot {gameSlot} />
  {/each}
</div>
