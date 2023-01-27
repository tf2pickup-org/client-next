<script lang="ts">
  import Button from '$lib/shared/components/button.svelte';
  import { tf2ClassOrder } from '$lib/shared/tf2-class-order';
  import type { Game } from '../models/game';
  import type { GameSlot } from '../models/game-slot';
  import type { Tf2Team } from '../models/tf2-team';
  import GameSlotList from './game-details/game-slot-list.svelte';
  import ScoreBar from './game-details/score-bar.svelte';
  import { format } from 'date-fns';
  import ChartBar from 'svelte-material-icons/ChartBar.svelte';
  import Filmstrip from 'svelte-material-icons/Filmstrip.svelte';

  export let game: Game;

  let gameSlotsBlu: GameSlot[];
  let gameSlotsRed: GameSlot[];
  let mapThumbnailUrl: string;
  let launchedAt: string;

  const slotsForTeam = (slots: GameSlot[], team: Tf2Team) =>
    slots
      .filter(slot => ['active', 'waiting for substitute'].includes(slot.status))
      .filter(slot => slot.team === team)
      .sort((a, b) => tf2ClassOrder[b.gameClass] - tf2ClassOrder[a.gameClass]);

  $: {
    gameSlotsBlu = slotsForTeam(game.slots, 'blu');
    gameSlotsRed = slotsForTeam(game.slots, 'red');
    mapThumbnailUrl = `https://mapthumbnails.tf2pickup.org/unsafe/640x240/${
      game.map.split('_')[1]
    }.jpg`;
    launchedAt = format(new Date(game.launchedAt), 'dd.MM.yyyy HH:mm');
  }
</script>

<div class="hidden xl:block">
  <ScoreBar score={game.score} />
</div>

<div class="flex flex-col flex-nowrap xl:mt-4 xl:flex-row">
  <div class="flex flex-1 flex-col flex-nowrap items-center justify-between px-2 pt-4 xl:px-8">
    <div class="my-4 text-center font-caption text-4xl text-white xl:text-6xl">
      Game #{game.number}
    </div>

    <div
      class="flex h-32 w-full flex-col bg-cover bg-center xl:h-60"
      style="background-image: url({mapThumbnailUrl})"
    >
      <div class="grow" />
      <div class="bg-white/80 text-center font-caption text-xl">{game.map}</div>
    </div>

    <div class="my-4 flex flex-col gap-4 self-stretch text-center text-white sm:flex-row">
      <div class="flex flex-1 flex-col">
        <div class="font-caption text-xl">Launched</div>
        <div>{launchedAt}</div>
      </div>

      <div class="flex flex-1 flex-col">
        <div class="font-caption text-xl">Server</div>
        <div>{game.gameServer?.name}</div>
      </div>

      <div class="flex flex-1 flex-col">
        <div class="font-caption text-xl">State</div>
        <div>{game.state}</div>
      </div>
    </div>

    <div class="flex flex-col flex-nowrap gap-4 sm:flex-row xl:flex-col">
      {#if game.logsUrl}
        <a href={game.logsUrl} target="_blank" rel="noreferrer">
          <Button>
            <div class="flex w-44 flex-row items-center gap-4 pl-2">
              <ChartBar />
              check logs
            </div>
          </Button>
        </a>
      {/if}

      {#if game.demoUrl}
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
  </div>

  <div class="mt-4 flex flex-col gap-4 xl:order-first xl:w-96">
    <div
      class="flex flex-row justify-between bg-team-blu p-4 font-caption text-2xl text-white xl:hidden"
    >
      <span>BLU</span>
      <span>{game.score?.blu ?? ''}</span>
    </div>
    <GameSlotList gameSlots={gameSlotsBlu} />
  </div>

  <div class="mt-4 flex flex-col gap-4 xl:w-96">
    <div
      class="flex flex-row justify-between bg-team-red p-4 font-caption text-2xl text-white xl:hidden"
    >
      <span>RED</span>
      <span>{game.score?.red ?? ''}</span>
    </div>
    <GameSlotList gameSlots={gameSlotsRed} />
  </div>
</div>
