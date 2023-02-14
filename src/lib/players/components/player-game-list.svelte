<script lang="ts">
  import type { Game } from '$lib/games/models/game';
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';
  import { IconLoader3 } from '@tabler/icons-svelte';
  import { format } from 'date-fns';
  import { fade } from 'svelte/transition';

  export let games: Game[] | undefined;
  export let loading: boolean;
  export let playerId: string;
</script>

<div class="flex min-h-[298px]">
  {#if loading}
    <div class="mx-auto self-center text-slate-700" in:fade={{ duration: 50, delay: 50 }}>
      <div class="animate-spin">
        <IconLoader3 />
      </div>
    </div>
  {:else}
    <ul
      class="text-primary mx-2 mb-2 list-none overflow-hidden text-ellipsis md:mx-4"
      in:fade={{ duration: 100 }}
      out:fade={{ duration: 50 }}
    >
      {#if games && games.length > 0}
        {#each games as game}
          {@const gameClass = game.slots.find(s => s.player.id === playerId)?.gameClass}
          {@const launchedAt = format(new Date(game.launchedAt), 'dd.MM.yyyy HH:mm')}
          {#if gameClass}
            <li class="my-1">
              <a href="/game/{game.number}" class="whitespace-nowrap">
                <GameClassIcon {gameClass} size={20} />
                <span>#{game.number} - {launchedAt} - {game.map}</span>
              </a>
            </li>
          {/if}
        {/each}
      {/if}
    </ul>
  {/if}
</div>
