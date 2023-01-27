<script lang="ts">
  import type { Game } from '$lib/games/models/game';
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';
  import { format } from 'date-fns';

  export let games: Game[];
  export let playerId: string;
</script>

<ul class="mx-2 md:mx-4 list-none overflow-hidden text-ellipsis text-primary">
  {#each games as game}
    {@const gameClass = game.slots.find(s => s.player.id === playerId)?.gameClass}
    {@const launchedAt = format(new Date(game.launchedAt), 'dd.MM.yyyy HH:mm')}
    {#if gameClass}
      <li class="my-1">
        <a href="/game/{game.id}" class="whitespace-nowrap">
          <GameClassIcon {gameClass} size={20} />
          <span>#{game.number} - {launchedAt} - {game.map}</span>
        </a>
      </li>
    {/if}
  {/each}
</ul>
