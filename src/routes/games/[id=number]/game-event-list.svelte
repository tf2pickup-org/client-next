<script lang="ts">
  import type { GameEvent } from '$lib/games/types/game-event';
  import { getContext } from 'svelte';
  import { derived, type Writable } from 'svelte/store';
  import GameEventC, { renderedEvents } from './game-event.svelte';

  const events = derived(getContext<Writable<GameEvent[]>>('game.events'), $events =>
    $events
      .filter(({ event }) => renderedEvents.includes(event))
      .toSorted((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()),
  );
</script>

<div class="game-event-list">
  {#each $events as event}
    <GameEventC {...event} />
  {/each}
</div>

<style lang="postcss">
  .game-event-list {
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
  }
</style>
