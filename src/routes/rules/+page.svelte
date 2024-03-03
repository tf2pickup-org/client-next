<script lang="ts">
  import { PUBLIC_WEBSITE_NAME, PUBLIC_WEBSITE_URL } from '$env/static/public';
  import PageTransition from '$lib/core/components/page-transition.svelte';
  import Markdown from '$lib/shared/components/markdown.svelte';
  import PageHeader from '$lib/shared/components/page-header.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>rules • {PUBLIC_WEBSITE_NAME}</title>
  <meta name="description" content="{PUBLIC_WEBSITE_NAME} rules" />
  <link rel="canonical" href="{PUBLIC_WEBSITE_URL}/rules" />

  <meta property="og:url" content="{PUBLIC_WEBSITE_URL}/rules" />
  <meta property="og:title" content={PUBLIC_WEBSITE_NAME} />
  <meta property="og:description" content="{PUBLIC_WEBSITE_NAME} rules" />
  <meta property="og:image" content="{PUBLIC_WEBSITE_URL}/favicon.png" />
  <meta property="og:image:alt" content="tf2pickup.pl icon" />
  <meta property="og:image:width" content="256" />
  <meta property="og:image:height" content="256" />
</svelte:head>

<PageTransition>
  <div class="container mx-auto flex flex-col">
    <PageHeader>Rules</PageHeader>
    <div class="mb-12 h-px bg-abru-light-50" />
    <article class="prose prose-invert mb-16 max-w-none">
      <Markdown source={data.body} />
    </article>
  </div>
</PageTransition>
