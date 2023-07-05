<script lang="ts">
  import GameLiveIndicator from '$lib/shared/components/game-live-indicator.svelte';
  import MapThumbnail from '$lib/shared/components/map-thumbnail.svelte';
  import { IconDeviceDesktopAnalytics, IconMovie, IconLivePhoto } from '@tabler/icons-svelte';
  import { format } from 'date-fns';

  export let gameNo: number;
  export let isRunning: boolean = false;
  export let map: string;
  export let launchedAt: Date;
  export let server: string | undefined;
  export let logsUrl: string | undefined = undefined;
  export let demoUrl: string | undefined = undefined;

  let launchedAtText: string;

  $: {
    launchedAtText = format(new Date(launchedAt), 'dd.MM.yyyy HH:mm');
  }
</script>

<div class="text-abru-light-75 flex h-full flex-col overflow-hidden rounded-lg">
  <div class="summary-caption relative flex flex-1 flex-col justify-end px-[10px]">
    <div class="absolute bottom-0 left-0 right-0 top-0 -z-10">
      <MapThumbnail {map} />
    </div>

    <div
      class="bg-abru text-accent-600 absolute left-[10px] top-[10px] flex flex-row items-center gap-[3px] rounded px-[8px] py-[6px] text-base font-bold leading-4 shadow"
    >
      <GameLiveIndicator />
      <span class="uppercase">live</span>
    </div>

    <span class="text-2xl font-medium">Game #{gameNo}</span>
  </div>
  <div class="bg-abru-dark-29 flex flex-col gap-[8px] p-[10px]">
    <div class="flex flex-col gap-[2px]">
      <span class="text-abru-light-75 font-light">map</span>
      <span class="text-abru-light-75 font-medium">{map}</span>
    </div>

    <div class="flex flex-col">
      <span class="text-abru-light-75 font-light">server</span>
      <span class="text-abru-light-75 font-medium">{server}</span>
    </div>

    <div class="flex flex-col">
      <span class="text-abru-light-75 font-light">launched</span>
      <span class="text-abru-light-75 font-medium">{launchedAtText}</span>
    </div>

    <div class="h-[45px]" />

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
      theme('colors.transparent') 30%,
      theme('colors.abru.dark.29') 100%
    );
  }
</style>
