<script lang="ts">
  import Button from '$lib/shared/components/button.svelte';
  import { getMapName } from '$lib/shared/get-map-name';
  import { tf2ClassOrder } from '$lib/shared/tf2-class-order';
  import { connectStringToLink } from '../connect-string-to-link';
  import type { Game } from '../models/game';
  import type { GameSlot } from '../models/game-slot';
  import type { Tf2Team } from '../models/tf2-team';
  import GameSlotList from './game-details/game-slot-list.svelte';
  import GameSummaryLinks from './game-details/game-summary-links.svelte';
  import ScoreBar from './game-details/score-bar.svelte';
  import { IconClipboardCopy, IconVideo } from '@tabler/icons-svelte';
  import { format } from 'date-fns';

  export let game: Game;

  let gameSlotsBlu: GameSlot[];
  let gameSlotsRed: GameSlot[];
  let mapThumbnailUrl: string;
  let launchedAt: string;
  let isRunning: boolean;
  let stvConnectLink: string | undefined;

  const slotsForTeam = (slots: GameSlot[], team: Tf2Team) =>
    slots
      .filter(slot => ['active', 'waiting for substitute'].includes(slot.status))
      .filter(slot => slot.team === team)
      .sort((a, b) => tf2ClassOrder[b.gameClass] - tf2ClassOrder[a.gameClass]);

  $: {
    gameSlotsBlu = slotsForTeam(game.slots, 'blu');
    gameSlotsRed = slotsForTeam(game.slots, 'red');
    mapThumbnailUrl = `https://mapthumbnails.tf2pickup.org/unsafe/640x240/${getMapName(
      game.map,
    )}.jpg`;
    launchedAt = format(new Date(game.launchedAt), 'dd.MM.yyyy HH:mm');
    isRunning = ['launching', 'started'].includes(game.state);
    stvConnectLink = game?.stvConnectString
      ? connectStringToLink(game.stvConnectString)
      : undefined;
  }
</script>

<div class="hidden xl:block">
  <ScoreBar score={game.score} />
</div>

<div class="flex flex-col flex-nowrap xl:mt-4 xl:flex-row">
  <div class="flex flex-1 flex-col flex-nowrap items-center justify-between px-2 xl:px-8">
    <div class="my-4 text-center font-caption text-4xl text-white xl:text-6xl">
      Game #{game.number}
    </div>

    <div
      class="flex h-32 w-full flex-col bg-slate-700 bg-cover bg-center xl:h-60"
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
        <div class:italic={!game.gameServer}>{game.gameServer?.name ?? 'unknown'}</div>
      </div>

      <div class="flex flex-1 flex-col">
        <div class="font-caption text-xl">State</div>
        <div>{game.state}</div>
      </div>
    </div>

    <div class="flex flex-col flex-nowrap gap-4 sm:flex-row xl:flex-col">
      {#if isRunning}
        <div
          class="flex flex-row items-center justify-between gap-2 bg-slate-300/80 py-1 px-2 text-2xl"
        >
          <input
            type="text"
            value={game.stvConnectString ?? 'configuring server...'}
            readonly
            class="grow appearance-none bg-transparent text-base"
            class:italic={!game.stvConnectString}
          />

          {#if game.stvConnectString}
            <button on:click={() => navigator.clipboard.writeText(game.stvConnectString ?? '')}>
              <IconClipboardCopy />
            </button>
          {/if}
        </div>

        {#if stvConnectLink}
          <a href={stvConnectLink} target="_blank" rel="noreferrer">
            <Button>
              <div class="flex w-44 flex-row items-center gap-4 pl-2">
                <IconVideo />watch game
              </div>
            </Button>
          </a>
        {/if}
      {/if}
    </div>

    <GameSummaryLinks {game} />
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
