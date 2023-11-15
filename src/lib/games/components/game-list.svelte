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
    column-gap: 8px;
    row-gap: 10px;

    grid-template-columns: 22px auto 1fr 1fr auto;

    @media screen(sm) {
      grid-template-columns: 22px repeat(4, auto) 1fr 1fr;
    }

    @media screen(xl) {
      grid-template-columns: 22px repeat(5, auto) 1fr;
    }
  }
</style>
