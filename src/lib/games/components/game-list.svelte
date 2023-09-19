<script lang="ts">
  import type { Tf2ClassName } from '$lib/shared/tf2-class-name';
  import type { Game } from '../types/game';
  import GameListItem from './game-list-item.svelte';

  interface ClassPlayed {
    classPlayed?: Tf2ClassName;
  }

  type GameWithClassPlayed = Game & ClassPlayed;

  export let games: GameWithClassPlayed[];
</script>

<div class="game-list">
  {#each games as game (game.id)}
    <GameListItem {...game} />
  {/each}
</div>

<style lang="postcss">
  .game-list {
    display: grid;
    grid-template-columns: repeat(6, auto) 1fr;
    column-gap: 8px;
    row-gap: 10px;
  }
</style>
