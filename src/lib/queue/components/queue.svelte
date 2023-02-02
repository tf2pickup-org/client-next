<script lang="ts">
  import { queue, requiredPlayerCount, currentPlayerCount } from '../queue.store';
  import MapVote from './map-vote.svelte';
  import QueueAnnouncements from './queue-announcements.svelte';
  import QueueSlotList from './queue-slot-list.svelte';
  import QueueStatus from './queue-status.svelte';
  import RequestNotificationPermission from './request-notification-permission.svelte';
</script>

<div class="container mx-auto my-4 px-2">
  <div class="my-4 flex flex-col gap-2">
    <RequestNotificationPermission />
    <QueueAnnouncements />
    <QueueStatus
      queueState={$queue.state}
      requiredPlayerCount={$requiredPlayerCount}
      currentPlayerCount={$currentPlayerCount}
    />
  </div>

  <div class="my-4">
    <MapVote mapVoteResults={$queue.state === 'loading' ? undefined : $queue.mapVoteResults} />
  </div>

  <div
    class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4"
    class:animate-pulse={$queue.state === 'loading'}
  >
    {#each $queue.config.classes.map(gc => gc.name) as gameClass}
      <QueueSlotList {gameClass} queueSlots={$queue.slots.filter(s => s.gameClass === gameClass)} />
    {/each}
  </div>
</div>
