<script lang="ts">
  import { ioConnected } from "$lib/io/io.store";
  import Alert from 'svelte-material-icons/Alert.svelte';
</script>

{#if $ioConnected === false}
  <div class="bg-error py-2 px-4 text-white font-semibold flex flex-row gap-2 items-center"><Alert size={24} />You are disconnected from the server.</div>
{/if}
