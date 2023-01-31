<script lang="ts">
  import Footer from '$lib/core/components/footer.svelte';
  import NavigationBar from '$lib/core/components/navigation-bar.svelte';
  import '../app.scss';
</script>

<NavigationBar />
<div class="relative flex-1">
  <slot />
</div>
<Footer />
