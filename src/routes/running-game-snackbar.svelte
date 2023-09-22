<script lang="ts">
  import { activeGameId } from '$lib/profile/profile.store';
  import Snackbar from '$lib/shared/components/snackbar.svelte';
</script>

<Snackbar>
  <div class="flex flex-col items-center gap-6">
    <span>You are involved in a currently running game</span>
    <a href="/games/{$activeGameId}" class="active-game-button"> Go back to the game </a>
  </div>
</Snackbar>

<style lang="postcss">
  .active-game-button {
    @apply transition-colors;
    @apply duration-75;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 12px 24px;
    font-size: 16px;
    font-weight: 700;

    color: theme('colors.abru.light.85');
    background-color: theme('colors.accent.DEFAULT');

    border-radius: 4px;

    text-transform: uppercase;

    &:hover {
      background-color: theme('colors.accent.hover');
    }
  }
</style>
