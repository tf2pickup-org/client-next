<script lang="ts">
  import Overlay from './overlay.svelte';
  import { fade } from 'svelte/transition';
</script>

<Overlay>
  <div class="dialog" in:fade={{ duration: 250 }} out:fade={{ duration: 100 }}>
    <slot />
  </div>
</Overlay>

<style lang="postcss">
  .dialog {
    color: theme('colors.abru.light.75');
    background-color: theme('colors.abru.dark.29');
    border-radius: 8px;
    padding: 32px;
    box-shadow: 0px 29px 37px 3px rgba(0, 0, 0, 0.4);

    @media only screen and (min-width: theme('screens.lg')) {
      margin: 48px;
      max-width: 1280px;
    }
  }
</style>
