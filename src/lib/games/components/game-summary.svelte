<script lang="ts">
  import MapThumbnail from '$lib/shared/components/map-thumbnail.svelte';
  import { IconDeviceDesktopAnalytics, IconMovie } from '@tabler/icons-svelte';
  import { format } from 'date-fns';

  export let gameNo: number;
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
  <div class="summary-caption relative flex flex-1 flex-col justify-end px-3">
    <div class="absolute bottom-0 left-0 right-0 top-0 -z-10">
      <MapThumbnail {map} />
    </div>

    <span class="text-2xl font-medium">Game #{gameNo}</span>
  </div>
  <div class="bg-abru-dark-29 flex flex-col gap-3 p-3">
    <div class="flex flex-col">
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

    <div class="h-3" />

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
