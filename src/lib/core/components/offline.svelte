<script lang="ts">
  import { ioConnected } from '$lib/io/io.store';
  import Banner, { BannerRole } from '$lib/shared/components/banner.svelte';
</script>

{#if $ioConnected === false}
  <Banner role={BannerRole.warning}>You are disconnected from the server.</Banner>
{/if}
