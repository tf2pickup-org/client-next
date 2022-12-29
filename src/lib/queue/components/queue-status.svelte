<script lang="ts">
  import type { QueueState } from '../models/queue-state';

  export let queueState: QueueState;
  export let currentPlayerCount: number = 0;
  export let requiredPlayerCount: number = 12;
</script>

<div class="flex justify-center p-2 sm:py-4 bg-queue-state-waiting rounded-2xl text-on-surface">
  <div class="text-2xl">
    <span class="font-bold">players:</span>
    {currentPlayerCount}/{requiredPlayerCount}
  </div>
</div>
