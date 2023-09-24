<script lang="ts">
  export let href: string;
</script>

<a {href} target="_blank" class="game-summary-link">
  <slot />
</a>

<style lang="postcss">
  .game-summary-link {
    @apply transition-colors;
    @apply duration-75;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border-radius: 4px;
    padding: 8px;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;

    background-color: theme('colors.abru.light.3');

    &:hover {
      background-color: theme('colors.abru.light.5');
    }
  }
</style>
