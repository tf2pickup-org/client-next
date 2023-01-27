<script lang="ts">
  import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
</script>

<div class="button flex h-[44px] items-center justify-between text-white">
  <div class="mx-4 text-xl uppercase">
    <slot />
  </div>
  <div class="mx-4 arrow-right">
    <ArrowRight size=24 />
  </div>
  <div class="dot" />
</div>

<style lang="scss">
  .button {
    position: relative;
    background-color: rgb(235, 21, 87);
    background-image: linear-gradient(135deg, rgb(235, 21, 87) 95%, rgb(10, 25, 51) 95%);

    .arrow-right {
      transition: transform 400ms ease-in-out;
    }

    .dot {
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 3px;
      background-color: #ffe497;
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
