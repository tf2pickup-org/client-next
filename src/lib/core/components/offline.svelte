<script lang="ts">
  import { ioConnected } from '$lib/io/io.store';
</script>

{#if $ioConnected === false}
  <div class="bg-accent-600 rounded-lg px-3 py-2">
    <span class="text-abru-dark-3 text-lg font-medium">
      You are disconnected from the server.
    </span>
  </div>
{/if}
