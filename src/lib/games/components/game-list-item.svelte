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
  <div class="live-indicator">
    {#if isRunning}
      <GameLiveIndicator />
    {/if}
  </div>

  <span class="game-number" class:text-accent={isRunning}>#{number}</span>

  <span class="map-name">{map}</span>
  <span class="launched-at"><DisplayDate date={launchedAt} /></span>

  <div class="game-class-icon">
    {#if classPlayed}
      <GameClassIcon gameClass={classPlayed} size={32} />
    {/if}
  </div>

  {#if state === 'interrupted'}
    <div class="label label--interrupted">force-ended</div>
  {:else if score && score.blu !== undefined && score.red !== undefined}
    <div class="label label--blu">
      blu: {score.blu}
    </div>
    <div class="label label--red">
      red: {score.red}
    </div>
  {:else if ['created', 'configuring', 'launching'].includes(state)}
    <div class="label label--launching">
      {state}
    </div>
  {:else}
    <div class="col-span-2" />
  {/if}

  <div class="absolute bottom-0 left-0 right-0 top-0 -z-10 overflow-hidden rounded-lg xl:left-1/3">
    <MapThumbnail {map} />
  </div>
</a>

<style lang="postcss">
  .game-list-item {
    @apply transition-colors;
    @apply duration-75;

    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    position: relative;
    @apply col-span-5;
    @apply row-span-3;
    place-items: center;

    padding: 8px;

    color: theme('colors.abru.light.75');
    font-weight: 500;

    background: theme('colors.abru.light.15 / 85%');

    overflow: hidden;
    border-radius: 8px;

    @media screen(sm) {
      @apply col-span-7;
      @apply row-span-1;

      grid-template-rows: initial;
      height: 60px;
    }

    @media screen(xl) {
      height: 80px;

      background: theme('colors.abru.light.15');
      background: linear-gradient(
        90deg,
        theme('colors.abru.light.15') 35%,
        theme('colors.transparent') 90%
      );
    }

    &:hover {
      background: theme('colors.abru.light.15 / 90%');

      @media screen(xl) {
        background: linear-gradient(
          90deg,
          lighten(theme('colors.abru.light.15'), 3%) 35%,
          theme('colors.transparent') 90%
        );
      }
    }

    .live-indicator {
      @apply row-span-3;
      order: 0;

      @media screen(sm) {
        @apply row-span-1;
      }
    }

    .game-number {
      @apply row-span-3;
      order: 1;

      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;

      @media screen(sm) {
        @apply row-span-1;
      }
    }

    .game-class-icon {
      @apply row-span-3;
      order: 3;
      margin: 0 8px;

      @media screen(sm) {
        @apply row-span-1;
        order: 2;
      }
    }

    .map-name {
      @apply col-span-2;
      order: 2;
      white-space: nowrap;

      @media screen(sm) {
        @apply col-span-1;
        order: 5;
      }

      @media screen(xl) {
        justify-self: start;
        margin: 0 16px;
      }
    }

    .launched-at {
      @apply col-span-2;
      order: 4;
      white-space: nowrap;

      @media screen(sm) {
        @apply col-span-1;
        order: 6;
      }

      @media screen(xl) {
        justify-self: start;
      }
    }

    .label {
      border-radius: 3px;
      padding: 0 13px;
      text-align: center;
      white-space: nowrap;
      order: 5;

      @media screen(sm) {
        order: 3;
      }

      &--blu {
        background-color: theme('colors.team-blu');
        text-transform: uppercase;
        order: 5;

        @media screen(sm) {
          order: 3;
        }
      }

      &--red {
        background-color: theme('colors.team-red');
        text-transform: uppercase;
        order: 6;

        @media screen(sm) {
          order: 4;
        }
      }

      &--interrupted {
        @apply col-span-2;
        background-color: theme('colors.abru.light.25');
        justify-self: stretch;
      }

      &--launching {
        @apply col-span-2;
        background-color: theme('colors.alert');
        color: theme('colors.abru.light.3');
        justify-self: stretch;
      }
    }
  }
</style>
