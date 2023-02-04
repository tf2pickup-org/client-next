<script lang="ts">
  import type { QueueSlot } from '../models/queue-slot';

  export let queueSlot: QueueSlot;

  let cssClass: string;

  $: cssClass = queueSlot.player ? 'bg-white/90' : 'bg-white/70';
</script>

<div
  class="flex h-12 items-center justify-center px-4 shadow-md transition-colors duration-75 {cssClass}"
>
  {#if queueSlot.player}
    <img src={queueSlot.player.avatar.small} alt="{queueSlot.player.name}'s avatar" width="32" />
    <a href="/player/{queueSlot.player.steamId}" class="flex-grow text-center text-xl">
      {queueSlot.player.name}
    </a>

    <div class="w-[32px]" />
  {/if}
</div>
