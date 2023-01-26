<script lang="ts">
  import type { QueueState } from '../models/queue-state';

  export let queueState: QueueState;
  export let currentPlayerCount: number = 0;
  export let requiredPlayerCount: number = 12;
</script>

<div
  class="flex justify-center bg-queue-state-waiting p-2 text-on-surface shadow-md sm:py-2"
>
  <div class="text-4xl font-caption">
    <span>players:</span>
    {currentPlayerCount}/{requiredPlayerCount}
  </div>
</div>
