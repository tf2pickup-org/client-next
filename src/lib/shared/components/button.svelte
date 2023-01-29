<script lang="ts">
  import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
</script>

<div class="button">
  <div class="mx-4 text-xl uppercase">
    <slot />
  </div>
  <div class="arrow-right mx-4">
    <ArrowRight size="24" />
  </div>
  <div class="dot" />
</div>

<style lang="scss">
  .button {
    display: flex;
    height: 44px;
    align-items: center;
    justify-content: space-between;
    color: theme('colors.white');
    position: relative;
    background-image: linear-gradient(
      135deg,
      theme('colors.button-primary') 95%,
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
      background-color: theme('colors.button-dot');
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
