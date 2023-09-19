<script lang="ts">
  import GameList from '$lib/games/components/game-list.svelte';
  import type { Game } from '$lib/games/types/game';
  import type { PaginatedList } from '$lib/shared/types/paginated-list';
  import type { Player } from '../types/player';
  import { getContext } from 'svelte';
  import { derived, type Writable } from 'svelte/store';

  const player = getContext<Writable<Player>>('player');
  const games = derived(getContext<Writable<PaginatedList<Game>>>('player.games'), $games => {
    return $games.results.map(game => ({
      ...game,
      classPlayed: game.slots.find(slot => slot.player.id === $player.id)?.gameClass,
    }));
  });
</script>

{#if $games}
  <GameList games={$games} />
{/if}
