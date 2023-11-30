<script context="module" lang="ts">
  import { GameEventType } from '$lib/games/types/game-event-type';
  import type { Player } from '$lib/players/types/player';

  export const renderedEvents = [
    GameEventType.gameCreated,
    GameEventType.gameStarted,
    GameEventType.gameEnded,

    GameEventType.gameServerAssigned,
    GameEventType.gameServerInitialized,

    GameEventType.substituteRequested,
    GameEventType.playerReplaced,
  ];
</script>

<script lang="ts">
  import type { Game } from '$lib/games/types/game';
  import { format } from 'date-fns';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { Tf2ClassName } from '$lib/shared/tf2-class-name';
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';

  export let event: GameEventType;
  export let at: string;

  export let gameServerName: string | undefined = undefined;
  export let actor: Player | undefined = undefined;
  export let player: Player | undefined = undefined;
  export let reason: string | undefined = undefined;
  export let replacee: Player | undefined = undefined;
  export let replacement: Player | undefined = undefined;

  const game = getContext<Writable<Game>>('game');

  let gameClass: Tf2ClassName | undefined;

  $: gameClass = $game.slots.find(s => s.player.id === player?.id)?.gameClass;
</script>

<div
  class="game-event"
  class:game-event--success={[GameEventType.playerReplaced].includes(event)}
  class:game-event--info={[GameEventType.gameServerInitialized].includes(event)}
  class:game-event--warning={[GameEventType.substituteRequested].includes(event)}
>
  <span class="at">{format(new Date(at), 'HH:mm')}</span>
  <div>
    {#if event === GameEventType.gameCreated}
      <span>Game created</span>
    {:else if event === GameEventType.gameServerAssigned}
      {#if actor}
        <span
          ><a href="/players/{actor.steamId}" class="font-bold">{actor.name}</a> assigned game server
        </span><span class="whitespace-nowrap font-bold">{gameServerName}</span>
      {:else}
        <span>Game server assigned: </span><span class="font-bold">{gameServerName}</span>
      {/if}
    {:else if event === GameEventType.gameServerInitialized}
      <span>Game server initialized</span>
    {:else if event === GameEventType.gameStarted}
      <span>Game started</span>
    {:else if event === GameEventType.gameEnded}
      <span>Game ended</span>
    {:else if event === GameEventType.substituteRequested}
      {#if actor && actor.steamId}
        <a href="/players/{actor.steamId}" class="font-bold">
          {actor.name}
        </a>
      {/if}
      <span
        >{#if actor && actor.steamId}r{:else}R{/if}equested substitute for</span
      >
      <a href="/players/{player?.steamId}" class="whitespace-nowrap font-bold">
        {#if gameClass}
          <GameClassIcon {gameClass} size={20} />
        {/if}
        {player?.name}</a
      >
      {#if reason}
        <span>({reason})</span>
      {/if}
    {:else if event === GameEventType.playerReplaced}
      {#if replacement}
        <a href="/players/{replacement.steamId}" class="font-bold">{replacement.name}</a>
      {/if}
      <span>replaced</span>
      {#if replacee}
        <a href="/players/{replacee.steamId}" class="font-bold">{replacee.name}</a>
      {/if}
    {:else}
      <span class="italic">{event}</span>
    {/if}
  </div>
</div>

<style lang="postcss">
  .game-event {
    display: flex;
    flex-flow: column nowrap;
    gap: 12px;

    border-radius: 8px;
    background-color: theme('colors.abru.dark.15');

    padding: 10px;

    font-size: 16px;
    font-weight: 500;
    color: theme('colors.abru.light.75');
    line-height: normal;

    border: 1px solid theme('colors.abru.light.25');

    .at {
      font-size: 12px;
      font-weight: 400;
    }

    &--success {
      border-color: #0a955b;
    }

    &--info {
      border-color: #17a6ff;
    }

    &--warning {
      border-color: #ff9e1f;
    }
  }
</style>
