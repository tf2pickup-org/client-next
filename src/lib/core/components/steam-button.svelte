<script>
  import { IconBrandSteam } from '@tabler/icons-svelte';
</script>

<a href="/auth/steam" class="steam-button"
  ><span>Sign in through Steam</span>
  <div class="icon"><IconBrandSteam /></div>
</a>

<style lang="postcss">
  .steam-button {
    background-color: theme('colors.steam');
    color: #ffffff;
    border-radius: 5px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 10px 16px;
    gap: 8px;
    align-items: center;

    span {
      font-size: 18px;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 0.05em;

      @media only screen and (min-width: theme('screens.lg')) {
        font-size: 16px;
      }
    }

    .icon {
      background-color: #ffffff;
      color: theme('colors.steam');
      border-radius: 3px;
      padding: 1px;
    }
  }
</style>
