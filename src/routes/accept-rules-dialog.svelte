<script lang="ts">
  import { acceptRules } from '$lib/profile/api/accept-rules';
  import Dialog from '$lib/shared/components/dialog.svelte';
  import FadeScroll from '$lib/shared/components/fade-scroll.svelte';
  import Markdown from '$lib/shared/components/markdown.svelte';

  export let rules: string;

  let disabled = false;
</script>

<Dialog>
  <div class="rules-wrapper flex flex-col gap-6">
    <FadeScroll>
      <article class="prose prose-invert max-w-none">
        <Markdown source={rules} />
      </article>
    </FadeScroll>

    <div class="flex flex-row justify-center">
      <button
        class="button button--accent"
        on:click={() => {
          disabled = true;
          acceptRules();
        }}
        {disabled}
      >
        I accept these rules
      </button>
    </div>
  </div>
</Dialog>

<style lang="postcss">
  .rules-wrapper {
    max-height: calc(100vh - 64px);

    @media screen(lg) {
      max-height: calc(100vh - 300px);
    }
  }
</style>
