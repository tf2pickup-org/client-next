<script lang="ts">
  import { connectStringToLink } from '$lib/shared/connect-string-to-link';

  export let connectString: string | undefined;

  let href: string | undefined;

  $: href = connectString ? connectStringToLink(connectString) : undefined;
</script>

<a {href} class="button button--accent join-game-button">
  <slot />
</a>

<style lang="postcss">
  .join-game-button {
    font-size: 18px;
  }
</style>
