<script lang="ts">
  import { websiteName } from '$environment';
  import Footer from '$lib/core/components/footer.svelte';
  import NavigationBar from '$lib/core/components/navigation-bar.svelte';
  import { queue } from '$lib/queue/queue.store';
  import '../app.scss';
  import type { LayoutData } from './$types';
  import { onMount } from 'svelte';

  export let data: LayoutData;

  onMount(() => {
    queue.set(data.queue);
  });
</script>

<svelte:head>
  <meta property="og:title" content={websiteName} />
  <meta property="og:type" content="games.other" />
  <meta property="og:url" content="https://tf2pickup.pl/" />
  <meta property="og:image" content="https://tf2pickup.pl/assets/favicon.png" />
</svelte:head>

<NavigationBar />
<slot />
<Footer />
