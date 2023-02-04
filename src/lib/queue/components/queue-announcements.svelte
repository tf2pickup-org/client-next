<script lang="ts">
  import { ioConnected } from '$lib/io/io.store';
  import { IconAlertTriangle } from '@tabler/icons-svelte';
</script>

{#if $ioConnected === false}
  <div class="flex flex-row items-center gap-2 bg-amaranth-600 py-2 px-4 font-semibold text-white">
    <IconAlertTriangle size={24} />You are disconnected from the server.
  </div>
{/if}
