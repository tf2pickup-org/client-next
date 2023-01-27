<script>
  import Queue from '$lib/queue/components/queue.svelte';
  import { requiredPlayerCount, currentPlayerCount } from '$lib/queue/queue.store';
</script>

<svelte:head>
  <title>[{$currentPlayerCount}/{$requiredPlayerCount}] tf2pickup.pl</title>
</svelte:head>

<Queue />
