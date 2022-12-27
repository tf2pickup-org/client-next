<script lang="ts">
  import type { Game } from "$lib/games/models/game";
  import GameClassIcon from "$lib/shared/components/game-class-icon.svelte";

  export let games: Game[];
  export let playerId: string;
</script>

<ul class="px-4 py-2 rounded-2xl bg-white text-primary list-none">
  {#each games as game}
    {@const gameClass = game.slots.find(s => s.player.id === playerId)?.gameClass}
    {#if gameClass}
      <li class="my-1">
        <a href="/game/{game.id}" class="whitespace-nowrap overflow-hidden text-ellipsis">
          <GameClassIcon {gameClass} size={20} />
          <span>#{game.number} - {game.launchedAt} - {game.map}</span>
        </a>
      </li>
    {/if}
  {/each}
</ul>
