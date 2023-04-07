<script lang="ts">
  import { websiteName } from '$environment';
  import Footer from '$lib/core/components/footer.svelte';
  import NavigationBar from '$lib/core/components/navigation-bar.svelte';
  import { profile } from '$lib/profile/profile.store';
  import { queue } from '$lib/queue/queue.store';
  import '../app.scss';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  $: {
    queue.set(data.queue);
    profile.set(data.profile);
  }
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
