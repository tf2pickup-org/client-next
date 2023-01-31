<script lang="ts">
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import PlayerList from '$lib/players/components/player-list.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>players • tf2pickup.pl</title>
</svelte:head>

<PageTransition>
  <div class="container mx-auto my-4">
    <PlayerList players={data.players} />
  </div>
</PageTransition>
