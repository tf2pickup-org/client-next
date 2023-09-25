<script lang="ts">
  import { PUBLIC_WEBSITE_NAME, PUBLIC_WEBSITE_URL } from '$env/static/public';
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import PageHeader from '$lib/shared/components/page-header.svelte';
  import { writable } from 'svelte/store';
  import type { PageData } from './$types';
  import PlayerPreferences from './player-preferences.svelte';
  import { setContext } from 'svelte';

  export let data: PageData;

  let preferences = writable<Record<string, unknown>>();

  $: preferences.set(data.preferences);

  setContext('preferences', preferences);
</script>

<svelte:head>
  <title>settings • {PUBLIC_WEBSITE_NAME}</title>
  <meta name="description" content="{PUBLIC_WEBSITE_NAME} settings" />
  <link rel="canonical" href="{PUBLIC_WEBSITE_URL}/settings" />

  <meta property="og:url" content="{PUBLIC_WEBSITE_URL}/settings" />
  <meta property="og:title" content={PUBLIC_WEBSITE_NAME} />
  <meta property="og:description" content="{PUBLIC_WEBSITE_NAME} settings" />
  <meta property="og:image" content="{PUBLIC_WEBSITE_URL}/favicon.png" />
  <meta property="og:image:alt" content="tf2pickup.pl icon" />
  <meta property="og:image:width" content="256" />
  <meta property="og:image:height" content="256" />
</svelte:head>

<PageTransition>
  <div class="container mx-auto flex flex-col gap-4">
    <PageHeader>Settings</PageHeader>
    <PlayerPreferences />
  </div>
</PageTransition>
