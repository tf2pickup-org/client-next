<script lang="ts">
  import { websiteName } from '$environment';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.player.name} • {websiteName}</title>
</svelte:head>
