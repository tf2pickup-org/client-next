<script lang="ts">
  import QueueSlotList from './queue-slot-list.svelte';
  import QueueState from './queue-state.svelte';
</script>

<div class="flex flex-col gap-8">
  <QueueState />
  <QueueSlotList on:joinQueue on:leaveQueue on:markAsFriend />
</div>
