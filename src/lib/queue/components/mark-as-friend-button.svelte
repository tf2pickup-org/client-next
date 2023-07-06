<script lang="ts">
  import { MarkAsFriendButtonState } from './mark-as-friend-button-state';
  import { IconHeart, IconHeartFilled } from '@tabler/icons-svelte';

  export let state: MarkAsFriendButtonState;
</script>

<button
  class="bg-abru-light-75 text-abru-950 disabled:text-abru-light-60 hover:bg-abru-light-70 flex h-[34px] w-[34px] items-center justify-center rounded transition-colors duration-75"
  class:selected={state === MarkAsFriendButtonState.selected}
  disabled={state === MarkAsFriendButtonState.disabled}
  on:click
>
  {#if state === MarkAsFriendButtonState.selected}
    <IconHeartFilled />
  {:else}
    <IconHeart />
  {/if}
</button>

<style lang="postcss">
  .selected {
    color: theme('colors.accent.600');
  }
</style>
