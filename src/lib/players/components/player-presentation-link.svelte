<script lang="ts">
  export let href: string;
</script>

<a {href} target="_blank" rel="noreferrer" class="player-presentation-link">
  <slot />
</a>

<style lang="postcss">
  .player-presentation-link {
    @apply transition-colors;
    @apply duration-75;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    gap: 8px;

    background-color: theme('colors.abru.light.3');
    color: theme('colors.abru.light.75');

    border-radius: 4px;
    padding: 12px 32px;

    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;

    &:hover {
      background-color: lighten(theme('colors.abru.light.3'), 2%);
    }
  }
</style>
