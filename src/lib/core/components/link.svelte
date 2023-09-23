<script lang="ts">
  export let href: string;
  export let active = false;
</script>

<a {href} class="link" class:bg-abru-dark-20={active}>
  <slot />
</a>

<style lang="postcss">
  .link {
    @apply transition-colors;
    @apply duration-75;

    color: theme('colors.abru.light.75');
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 4px;
    border-radius: 4px;
    padding: 4px 10px;

    &:hover {
      background-color: theme('colors.abru.dark.20 / 40%');
    }
  }
</style>
