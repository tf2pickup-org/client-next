<script lang="ts">
  import type { Document } from '../models/document';
  import SvelteMarkdown from 'svelte-markdown';

  export let document: Document;
</script>

<div class="bg-white/80 py-2 px-4 sm:py-8 sm:px-10 xl:py-12 xl:px-16">
  <p class="prose max-w-none">
    <SvelteMarkdown source={document.body} />
  </p>
</div>
