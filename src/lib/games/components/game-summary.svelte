<script lang="ts">
  import GameLiveIndicator from '$lib/shared/components/game-live-indicator.svelte';
  import MapThumbnail from '$lib/shared/components/map-thumbnail.svelte';
  import ConnectString from './connect-string.svelte';
  import JoinGameButton from './join-game-button.svelte';
  import { IconDeviceDesktopAnalytics, IconMovie } from '@tabler/icons-svelte';
  import { format } from 'date-fns';

  export let gameNo: number;
  export let isRunning: boolean = false;
  export let map: string;
  export let launchedAt: Date;
  export let server: string | undefined;
  export let logsUrl: string | undefined = undefined;
  export let demoUrl: string | undefined = undefined;
  export let connectString: string | undefined = undefined;

  let launchedAtText: string;

  $: {
    launchedAtText = format(new Date(launchedAt), 'dd.MM.yyyy HH:mm');
  }
</script>

<div class="text-abru-light-75 flex h-full flex-col overflow-hidden rounded-lg">
  <div class="summary-caption relative flex min-h-[200px] flex-1 flex-col justify-end px-[10px]">
    <div class="absolute bottom-0 left-0 right-0 top-0 -z-10">
      <MapThumbnail {map} />
    </div>

    <div
      class="bg-abru/90 text-abru-light-75 absolute left-[10px] top-[10px] flex flex-row items-center gap-[3px] rounded px-[8px] py-[6px] text-base font-bold leading-4 shadow"
    >
      <span>#{gameNo}</span>
    </div>

    {#if isRunning}
      <div
        class="bg-abru text-accent-600 absolute right-[10px] top-[10px] flex flex-row items-center gap-[3px] rounded px-[8px] py-[6px] text-base font-bold leading-4 shadow"
      >
        <GameLiveIndicator />
        <span class="uppercase">live</span>
      </div>
    {/if}

    <div class="info">
      <span class="label">map</span>
      <span class="value">{map}</span>
    </div>
  </div>
  <div class="bg-abru-dark-29 flex flex-col gap-[8px] p-[10px]">
    <div class="info">
      <span class="label">server</span>
      <span class="value">{server}</span>
    </div>

    <div class="info">
      <span class="label">launched</span>
      <span class="value">{launchedAtText}</span>
    </div>

    {#if isRunning && connectString}
      <div class="flex flex-col gap-3">
        <ConnectString {connectString} />
        <JoinGameButton {connectString} />
      </div>
    {/if}

    {#if logsUrl || demoUrl}
      <div class="h-[45px]" />
    {/if}

    {#if logsUrl}
      <a
        href={logsUrl}
        target="_blank"
        class="bg-abru-light-3 hover:bg-abru-light-5 flex items-center justify-center gap-2 rounded py-2 text-xl font-medium transition-colors duration-75"
        ><IconDeviceDesktopAnalytics /><span class="uppercase">logs</span></a
      >
    {/if}

    {#if demoUrl}
      <a
        href={demoUrl}
        target="_blank"
        class="bg-abru-light-3 hover:bg-abru-light-5 flex items-center justify-center gap-2 rounded py-2 text-xl font-medium transition-colors duration-75"
        ><IconMovie /><span class="uppercase">demo</span></a
      >
    {/if}
  </div>
</div>

<style lang="postcss">
  .summary-caption {
    background: linear-gradient(
      180deg,
      theme('colors.transparent') 25%,
      theme('colors.abru.dark.29') 95%
    );
  }

  .info {
    display: flex;
    flex-flow: column nowrap;

    color: theme('colors.abru.light.75');

    .label {
      font-weight: 300;
    }

    .value {
      font-weight: 500;
    }
  }
</style>
