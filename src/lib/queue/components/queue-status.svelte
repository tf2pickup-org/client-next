<script lang="ts">
  import type { QueueState } from '../models/queue-state';

  export let queueState: QueueState;
  export let currentPlayerCount: number = 0;
  export let requiredPlayerCount: number = 12;
</script>

<div
  class="flex justify-center rounded-2xl bg-queue-state-waiting p-2 text-on-surface shadow-md sm:py-4"
>
  <div class="text-2xl">
    <span class="font-bold">players:</span>
    {currentPlayerCount}/{requiredPlayerCount}
  </div>
</div>
