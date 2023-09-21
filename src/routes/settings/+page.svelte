<script>
  import { PUBLIC_WEBSITE_NAME, PUBLIC_WEBSITE_URL } from '$env/static/public';
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
