<script lang="ts">
  import { fetchDocument } from '$lib/documents/api/fetch-document';
  import Document from '$lib/documents/components/document.svelte';
  import type { Document as DocumentType } from '$lib/documents/models/document';
  import { onMount } from 'svelte';

  let rules: DocumentType;

  onMount(async () => {
    rules = await fetchDocument('rules');
  });
</script>

<svelte:head>
  <title>rules • tf2pickup.pl</title>
</svelte:head>

<div class="container mx-auto my-12">
  {#if rules}
    <Document document={rules} />
  {/if}
</div>
