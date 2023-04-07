<script lang="ts">
  import { joinQueue } from '../api/join-queue';
  import { leaveQueue } from '../api/leave-queue';
  import QueueSlotList from './queue-slot-list.svelte';
  import QueueState from './queue-state.svelte';
</script>

<div class="flex flex-col gap-8">
  <QueueState />
  <QueueSlotList
    on:joinQueue={event => joinQueue(event.detail.slotId)}
    on:leaveQueue={() => leaveQueue()}
  />
</div>
