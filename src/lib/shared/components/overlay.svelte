<script>
  import { fade } from 'svelte/transition';
</script>

<div class="overlay" in:fade={{ duration: 100 }}>
  <slot />
</div>

<style lang="postcss">
  .overlay {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(62, 54, 65, 0.4);
    backdrop-filter: blur(12.4px);
  }
</style>
