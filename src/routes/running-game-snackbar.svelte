<script lang="ts">
  import { activeGameId } from '$lib/profile/profile.store';
  import Snackbar from '$lib/shared/components/snackbar.svelte';
</script>

<Snackbar>
  <div class="flex flex-col items-center gap-6">
    <span>You are involved in a currently running game</span>
    <a href="/games/{$activeGameId}" class="button button--accent"> Go back to the game </a>
  </div>
</Snackbar>
