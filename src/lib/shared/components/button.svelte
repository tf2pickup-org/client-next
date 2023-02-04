<script lang="ts">
  import { IconArrowRight } from '@tabler/icons-svelte';

  export let alternateColor: string = '';
  export let className: string = '';

  let cssStyle: string;

  $: cssStyle = alternateColor ? `--button-dot-color: ${alternateColor}` : '';
</script>

<div class="button {className}" style={cssStyle}>
  <div class="mx-4 text-xl uppercase">
    <slot />
  </div>
  <div class="arrow-right mx-4">
    <IconArrowRight size={24} />
  </div>
  <div class="dot" />
</div>

<style lang="scss">
  .button {
    display: flex;
    min-height: 44px;
    align-items: center;
    justify-content: space-between;
    color: theme('colors.white');
    position: relative;
    background-image: linear-gradient(
      135deg,
      theme('colors.amaranth.600') 95%,
      rgba(0, 0, 0, 0) 95%
    );

    .arrow-right {
      transition: transform 400ms ease-in-out;
    }

    .dot {
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 3px;
      background-color: var(--button-dot-color, theme('colors.jasmine.200'));
      transition: width 300ms ease;
    }

    &:hover {
      .arrow-right {
        transform: translate3d(10px, 0px, 0px);
      }

      .dot {
        width: 100%;
      }
    }
  }
</style>
