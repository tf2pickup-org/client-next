<script lang="ts">
  import type { Game } from '$lib/games/types/game';
  import type { GameSlot } from '$lib/games/types/game-slot';
  import type { Tf2Team } from '$lib/games/types/tf2-team';
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';
  import { tf2ClassOrder } from '$lib/shared/tf2-class-order';
  import { getContext } from 'svelte';
  import { derived, type Writable } from 'svelte/store';
  import GameSlotComponent from './game-slot.svelte';

  const slotsForTeam = (slots: GameSlot[], team: Tf2Team) =>
    slots
      .filter(slot => slot.team === team)
      .sort((a, b) => tf2ClassOrder[b.gameClass] - tf2ClassOrder[a.gameClass]);

  const game = getContext<Writable<Game>>('game');
  const score = derived(game, $game => $game.score);
  const slots = derived(game, $game => $game.slots);

  const activeSlots = derived(slots, $slots =>
    $slots.filter(slot => ['active', 'waiting for substitute'].includes(slot.status)),
  );

  const slotPairs = derived(activeSlots, $slots => {
    const blus = slotsForTeam($slots, 'blu');
    const reds = slotsForTeam($slots, 'red');

    const ret = [];

    for (let i = 0; i < Math.max(blus.length, reds.length); ++i) {
      const blu = blus.at(i);
      const red = reds.at(i);
      const gameClass = blu ? blu.gameClass : red!.gameClass;
      ret.push({ blu, red, gameClass });
    }

    return ret;
  });
</script>

<div class="grid grid-cols-2 gap-[4px]">
  <div class="score-header blu">
    <span class="uppercase">blu</span>
    <span>{$score?.blu ?? ''}</span>
  </div>

  <div class="score-header red">
    <span class="uppercase">red</span>
    <span>{$score?.red ?? ''}</span>
  </div>
</div>

<div class="slot-list">
  {#each $slotPairs as { red, blu, gameClass }}
    {#if blu}
      <GameSlotComponent slot={blu} side="left" on:replacePlayer />
    {:else}
      <div />
    {/if}

    <GameClassIcon {gameClass} size={32} />

    {#if red}
      <GameSlotComponent slot={red} side="right" on:replacePlayer />
    {:else}
      <div />
    {/if}
  {/each}
</div>

<style lang="postcss">
  .score-header {
    display: flex;
    justify-content: space-between;

    padding: 7px 24px 8px 24px;
    font-size: 48px;
    line-height: normal;
    font-weight: 700;

    color: theme('colors.ash');

    &.blu {
      background-color: theme('colors.team-blu');
      padding-right: 34px;
      border-top-left-radius: 8px;
      flex-direction: row;
    }

    &.red {
      background-color: theme('colors.team-red');
      padding-left: 34px;
      border-top-right-radius: 8px;
      flex-direction: row-reverse;
    }
  }

  .slot-list {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 10px;
    border-radius: 0 0 8px 8px;
    background-color: rgb(0 0 0 / 0.4);
    padding: 10px;
  }
</style>
