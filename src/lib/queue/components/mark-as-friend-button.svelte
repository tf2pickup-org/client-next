<script lang="ts">
  import { MarkAsFriendButtonState } from './mark-as-friend-button-state';
  import { IconHeart, IconHeartFilled } from '@tabler/icons-svelte';

  export let state: MarkAsFriendButtonState;
</script>

<button
  class="mark-as-friend-button"
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
  .mark-as-friend-button {
    @apply transition-colors;
    @apply duration-75;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 34px;
    width: 34px;

    border-radius: 4px;

    color: theme('colors.black');
    background-color: theme('colors.abru.light.75');

    &:disabled {
      color: theme('colors.abru.light.60');
    }

    &:hover {
      background-color: theme('colors.abru.light.70');
    }
  }

  .selected {
    color: theme('colors.accent.600');
  }
</style>
