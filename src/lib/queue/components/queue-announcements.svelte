<script lang="ts">
  import { ioConnected } from '$lib/io/io.store';
  import Alert from 'svelte-material-icons/Alert.svelte';
</script>

{#if $ioConnected === false}
  <div class="flex flex-row items-center gap-2 bg-error py-2 px-4 font-semibold text-white">
    <Alert size={24} />You are disconnected from the server.
  </div>
{/if}
