<script lang="ts">
  import { currentPlayerCount, requiredPlayerCount } from '../queue.store';
</script>

<div class="bg-abru-400 flex h-[55px] items-center justify-center rounded-lg p-2 shadow-md sm:py-2">
  <div class="text-xl font-bold">
    <span>Players:</span>
    {$currentPlayerCount}/{$requiredPlayerCount}
  </div>
</div>
