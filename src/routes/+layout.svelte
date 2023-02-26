<script lang="ts">
  import Footer from '$lib/core/components/footer.svelte';
  import NavigationBar from '$lib/core/components/navigation-bar.svelte';
  import PreReadyUpButton from '$lib/queue/components/pre-ready-up-button.svelte';
  import { isInQueue } from '$lib/queue/queue.store';
  import '../app.scss';
</script>

<NavigationBar />
<div class="relative flex-1">
  <slot />
</div>
<Footer />

{#if $isInQueue}
  <PreReadyUpButton />
{/if}
