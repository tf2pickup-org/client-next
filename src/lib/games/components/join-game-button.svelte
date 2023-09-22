<script lang="ts">
  export let href: string | undefined;
</script>

<a {href} class="join-game-button">
  <slot />
</a>

<style lang="postcss">
  .join-game-button {
    @apply transition-colors;
    @apply duration-100;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border-radius: 4px;
    padding: 12px;
    font-size: 18px;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;

    color: theme('colors.gray.100');
    background-color: theme('colors.accent.DEFAULT');

    &:hover {
      background-color: theme('colors.accent.hover');
    }
  }
</style>
