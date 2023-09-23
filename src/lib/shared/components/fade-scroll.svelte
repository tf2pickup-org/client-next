<script lang="ts">
  import { onMount } from 'svelte';

  let container: HTMLElement;
  let maskTop = false;
  let maskBottom = false;

  const update = () => {
    const isScrollable = container.scrollHeight > container.clientHeight;
    if (!isScrollable) {
      maskTop = false;
      maskBottom = false;
      return;
    }

    maskBottom = container.scrollHeight > container.clientHeight + container.scrollTop;
    maskTop = container.scrollTop > 0;
  };

  onMount(() => update());
</script>

<div
  class="fade-scroll overflow-auto"
  bind:this={container}
  on:scroll={update}
  class:mask-top={maskTop}
  class:mask-bottom={maskBottom}
>
  <slot />
</div>

<style lang="postcss">
  .fade-scroll {
    mask-image: linear-gradient(
      to bottom,
      transparent 0,
      black var(--top-mask-size, 0),
      black calc(100% - var(--bottom-mask-size, 0)),
      transparent 100%
    );
    --top-mask-size: 0px;
    --bottom-mask-size: 0px;
  }

  .mask-top {
    @media only screen and (min-width: theme('screens.lg')) {
      padding-right: 16px;
    }
    --top-mask-size: 96px !important;
  }

  .mask-bottom {
    @media only screen and (min-width: theme('screens.lg')) {
      padding-right: 16px;
    }
    --bottom-mask-size: 96px !important;
  }
</style>
