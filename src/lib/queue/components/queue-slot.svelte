<script lang="ts">
  import type { QueueSlot } from '../models/queue-slot';

  export let queueSlot: QueueSlot;
</script>

<div
  class="flex h-12 items-center justify-center rounded-2xl px-4 shadow-md transition-colors"
  class:bg-queue-slot-free={!Boolean(queueSlot.player)}
  class:bg-queue-slot-taken={Boolean(queueSlot.player)}
>
  {#if queueSlot.player}
    <img src={queueSlot.player.avatar.small} alt="{queueSlot.player.name}'s avatar" width="32" />
    <a href="/player/{queueSlot.player.steamId}" class="flex-grow text-center text-xl font-bold">
      {queueSlot.player.name}
    </a>

    <div class="w-[32px]" />
  {/if}
</div>
