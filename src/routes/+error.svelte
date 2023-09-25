<script lang="ts">
  import { page } from '$app/stores';
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import PageHeader from '$lib/shared/components/page-header.svelte';
</script>

<PageTransition>
  <div class="container mx-auto">
    <PageHeader>
      <span class="error">{$page.status}</span>
    </PageHeader>
    <div class="error">{$page.error?.message}</div>
  </div>
</PageTransition>

<style lang="postcss">
  .error {
    color: theme('colors.red.500');
  }
</style>
