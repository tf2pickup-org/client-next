<script lang="ts">
  import { queue, requiredPlayerCount, currentPlayerCount } from '../queue.store';
  import MapVote from './map-vote.svelte';
  import QueueAnnouncements from './queue-announcements.svelte';
  import QueueSlotList from './queue-slot-list.svelte';
  import QueueStatus from './queue-status.svelte';
</script>

<div class="container mx-auto px-2">
  <div class="my-7 flex flex-col gap-2">
    <QueueAnnouncements />
    <QueueStatus
      queueState={$queue.state}
      requiredPlayerCount={$requiredPlayerCount}
      currentPlayerCount={$currentPlayerCount}
    />
  </div>

  <div class="my-4">
    <MapVote mapVoteResults={$queue.mapVoteResults} />
  </div>

  <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
    {#each $queue.config.classes.map(gc => gc.name) as gameClass}
      <QueueSlotList {gameClass} queueSlots={$queue.slots.filter(s => s.gameClass === gameClass)} />
    {/each}
  </div>
</div>
