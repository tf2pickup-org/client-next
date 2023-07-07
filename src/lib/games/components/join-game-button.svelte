<script lang="ts">
  import { connectStringToLink } from '$lib/shared/connect-string-to-link';
  import { IconLoader3, IconPlayerPlayFilled } from '@tabler/icons-svelte';

  export let connectString: string | undefined;

  let href: string | undefined;

  $: href = connectString ? connectStringToLink(connectString) : undefined;
</script>

<a
  {href}
  class="join-game-button flex flex-row items-center justify-center gap-2 rounded p-[14px] text-lg font-bold uppercase leading-none text-gray-100"
>
  {#if connectString}
    <IconPlayerPlayFilled size={16} />
    join game
  {:else}
    <IconLoader3 size={16} class="animate-spin" />
  {/if}
</a>

<style lang="postcss">
  .join-game-button {
    @apply transition-colors;
    @apply duration-100;

    background-color: theme('colors.accent.DEFAULT');

    &:hover {
      background-color: theme('colors.accent.hover');
    }
  }
</style>
