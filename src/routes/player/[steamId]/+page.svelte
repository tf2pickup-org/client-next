<script lang="ts">
  import { PUBLIC_WEBSITE_NAME } from '$env/static/public';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.player.name} • {PUBLIC_WEBSITE_NAME}</title>
</svelte:head>
