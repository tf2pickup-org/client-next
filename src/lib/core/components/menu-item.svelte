<script lang="ts">
  export let href: string;
  export let active: boolean = false;
</script>

<a {href} class="menu-item" class:active>
  <slot />
</a>

<style lang="postcss">
  .menu-item {
    @apply transition-colors;
    @apply duration-75;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 4px;

    background-color: theme('colors.abru.dark.29');
    color: theme('colors.abru.light.75');

    font-size: 36px;
    font-weight: 500;

    border-radius: 10px;
    padding: 7px 34px;

    &:hover {
      background-color: theme('colors.abru.dark.20 / 40%');
    }

    @media only screen and (min-width: theme('screens.lg')) {
      background-color: initial;

      font-size: 18px;

      border-radius: 4px;
      padding: 4px 10px;
    }

    &.active {
      background-color: theme('colors.abru.dark.20');
    }
  }
</style>
