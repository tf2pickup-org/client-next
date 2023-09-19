<script lang="ts">
  import DisplayDate from '$lib/shared/components/date.svelte';
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';
  import GameLiveIndicator from '$lib/shared/components/game-live-indicator.svelte';
  import MapThumbnail from '$lib/shared/components/map-thumbnail.svelte';
  import type { Tf2ClassName } from '$lib/shared/tf2-class-name';
  import type { Game } from '../types/game';
  import type { GameState } from '../types/game-state';

  export let number: number;
  export let launchedAt: Date;
  export let map: string;
  export let state: GameState;
  export let score: Game['score'] | undefined = undefined;
  export let classPlayed: Tf2ClassName | undefined = undefined;

  let isRunning: boolean;

  $: isRunning = ['created', 'configuring', 'launching', 'started'].includes(state);
</script>

<a class="game-list-item" href="/games/{number}">
  <div class="min-w-[14px]">
    {#if isRunning}
      <GameLiveIndicator />
    {/if}
  </div>

  <span class="text-2xl" class:text-accent={isRunning}>#{number}</span>

  <div class="mx-2">
    {#if classPlayed}
      <div class="mx-2">
        <GameClassIcon gameClass={classPlayed} size={32} />
      </div>
    {/if}
  </div>

  {#if state === 'interrupted'}
    <div class="bg-abru-light-25 col-span-2 justify-self-stretch rounded-[3px] px-3.5 text-center">
      force-ended
    </div>
  {:else if score && score.blu !== undefined && score.red !== undefined}
    <div class="bg-team-blu min-w-[80px] rounded-[3px] px-3.5 text-center uppercase">
      blu: {score.blu}
    </div>
    <div class="bg-team-red min-w-[80px] rounded-[3px] px-3.5 text-center uppercase">
      red: {score.red}
    </div>
  {:else if ['created', 'configuring', 'launching'].includes(state)}
    <div
      class="bg-alert text-abru-light-3 col-span-2 justify-self-stretch rounded-[3px] px-3.5 text-center"
    >
      {state}
    </div>
  {:else}
    <div class="col-span-2" />
  {/if}

  <span class="mx-4 justify-self-start">{map}</span>
  <span class="justify-self-start whitespace-nowrap"><DisplayDate date={launchedAt} /></span>

  <div class="absolute bottom-0 left-1/3 right-0 top-0 -z-10 overflow-hidden rounded-lg">
    <MapThumbnail {map} />
  </div>
</a>

<style lang="postcss">
  .game-list-item {
    display: grid;
    position: relative;
    grid-column: span 7 / span 7;
    grid-template-columns: subgrid;
    place-items: center;

    height: 80px;
    padding: 8px;

    color: theme('colors.abru.light.75');
    font-weight: 500;

    background: theme('colors.abru.light.15');
    background: linear-gradient(
      90deg,
      theme('colors.abru.light.15') 35%,
      theme('colors.transparent') 90%
    );

    overflow: hidden;
    border-radius: 8px;

    &:hover {
      background: linear-gradient(
        90deg,
        theme('colors.abru.light.25') 35%,
        theme('colors.transparent') 90%
      );
    }
  }
</style>
