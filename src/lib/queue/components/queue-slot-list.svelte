<script lang="ts">
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';
  import { queueConfig, queueSlots } from '../queue.store';
  import QueueSlot from './queue-slot.svelte';
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
  {#each $queueConfig.classes.map(gc => gc.name) as gameClass}
    <div class="flex flex-col gap-4">
      <div class="flex flex-row items-center justify-center gap-2">
        <GameClassIcon {gameClass} size={32} />
        <span class="text-center text-2xl font-bold text-white">{gameClass}</span>
      </div>

      {#each $queueSlots.filter(s => s.gameClass === gameClass) as queueSlot}
        <QueueSlot {queueSlot} on:joinQueue on:leaveQueue on:markAsFriend />
      {/each}
    </div>
  {/each}
</div>
