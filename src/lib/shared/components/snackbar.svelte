<script lang="ts">
  import { fly } from 'svelte/transition';
</script>

<div class="snackbar" in:fly={{ y: 15 }} out:fly={{ y: 15, duration: 100 }}>
  <slot />
</div>

<style lang="postcss">
  .snackbar {
    position: fixed;
    bottom: 48px;
    left: 50%;
    transform: translate(-50%, 0);

    border-radius: 8px;
    background-color: theme('colors.abru.dark.29');
    box-shadow: 0px 29px 37px 3px rgba(0, 0, 0, 0.4);

    color: theme('colors.abru.light.70');
    font-size: 24px;
    font-weight: 500;

    padding: 32px 42px;
  }
</style>
