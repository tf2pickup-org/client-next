<script lang="ts">
  import GameSummary from '$lib/games/components/game-summary.svelte';
  import TeamPlayerList from '$lib/games/components/team-player-list.svelte';
  import type { Game } from '$lib/games/types/game';
  import type { GameSlot } from '$lib/games/types/game-slot';
  import type { Tf2Team } from '$lib/games/types/tf2-team';
  import { tf2ClassOrder } from '$lib/shared/tf2-class-order';
  import type { PageData } from './$types';

  export let data: PageData;

  let game: Game = data.game;
  let gameSlotsBlu: GameSlot[];
  let gameSlotsRed: GameSlot[];

  const slotsForTeam = (slots: GameSlot[], team: Tf2Team) =>
    slots
      .filter(slot => ['active', 'waiting for substitute'].includes(slot.status))
      .filter(slot => slot.team === team)
      .sort((a, b) => tf2ClassOrder[b.gameClass] - tf2ClassOrder[a.gameClass]);

  $: {
    gameSlotsBlu = slotsForTeam(game.slots, 'blu');
    gameSlotsRed = slotsForTeam(game.slots, 'red');
  }
</script>

<svelte:head>
  <title>#{game.number} • tf2pickup.pl</title>
</svelte:head>

<div class="container mx-auto mt-12 grid grid-cols-8 gap-x-4">
  <div class="order-first col-span-2">
    <GameSummary
      gameNo={game.number}
      map={game.map}
      launchedAt={game.launchedAt}
      server={game.gameServer?.name}
      logsUrl={game.logsUrl}
      demoUrl={game.demoUrl}
    />
  </div>

  <div class="col-span-3">
    <TeamPlayerList team="blu" score={game.score?.blu} slots={gameSlotsBlu} />
  </div>

  <div class="col-span-3">
    <TeamPlayerList team="red" score={game.score?.red} slots={gameSlotsRed} />
  </div>
</div>
