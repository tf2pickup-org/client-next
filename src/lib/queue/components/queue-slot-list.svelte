<script lang="ts">
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';
  import type { Tf2ClassName } from '$lib/shared/models/tf2-class-name';
  import type { QueueSlot as QueueSlotType } from '../models/queue-slot';
  import QueueSlot from './queue-slot.svelte';

  export let gameClass: Tf2ClassName;
  export let queueSlots: QueueSlotType[];
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-row items-center justify-center gap-2">
    <GameClassIcon {gameClass} size={28} />
    <span class="text-center font-caption text-3xl text-white">{gameClass}</span>
  </div>

  {#each queueSlots as queueSlot}
    <QueueSlot {queueSlot} on:joinQueue on:leaveQueue />
  {/each}
</div>
