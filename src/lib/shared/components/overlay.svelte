<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  onMount(() => {
    document.documentElement.classList.add('overflow-hidden');

    return () => {
      document.documentElement.classList.remove('overflow-hidden');
    };
  });
</script>

<div class="overlay" in:fade={{ duration: 100 }}>
  <div class="content">
    <slot />
  </div>
</div>

<style lang="postcss">
  .overlay {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background: theme('colors.abru.dark.3 / 50%');
    backdrop-filter: blur(1px);

    .content {
      position: static;
      overflow: auto;
    }
  }
</style>
