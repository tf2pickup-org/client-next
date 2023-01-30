<script lang="ts">
  import type { Game } from '$lib/games/models/game';
  import Button from '$lib/shared/components/button.svelte';
  import ChartBar from 'svelte-material-icons/ChartBar.svelte';
  import Filmstrip from 'svelte-material-icons/Filmstrip.svelte';

  export let game: Game | undefined;
</script>

<div class="flex flex-col flex-nowrap gap-4 sm:flex-row xl:flex-col">
  {#if game?.logsUrl}
    <a href={game.logsUrl} target="_blank" rel="noreferrer">
      <Button>
        <div class="flex w-44 flex-row items-center gap-4 pl-2">
          <ChartBar />
          check logs
        </div>
      </Button>
    </a>
  {/if}

  {#if game?.demoUrl}
    <a href={game.demoUrl} target="_blank" rel="noreferrer">
      <Button>
        <div class="flex w-44 flex-row items-center gap-4 pl-2">
          <Filmstrip />
          watch demo
        </div>
      </Button>
    </a>
  {/if}
</div>
