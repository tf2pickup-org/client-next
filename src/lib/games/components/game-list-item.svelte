<script lang="ts">
  import DisplayDate from '$lib/shared/components/date.svelte';
  import MapThumbnail from '$lib/shared/components/map-thumbnail.svelte';
  import type { Game } from '../types/game';

  export let number: number;
  export let launchedAt: Date;
  export let map: string;
  export let score: Game['score'] | undefined = undefined;
</script>

<a
  class="text-abru-light-75 game-list-item relative flex h-[80px] flex-row items-center gap-6 overflow-hidden rounded-lg px-6 font-medium"
  href="/games/{number}"
>
  <span class="text-2xl">#{number}</span>

  {#if score}
    <div class="flex flex-row gap-2">
      <span class="bg-team-red rounded-[3px] px-3.5 uppercase">red: {score.red}</span>
      <span class="bg-team-blu rounded-[3px] px-3.5 uppercase">blu: {score.blu}</span>
    </div>
  {/if}

  <span>{map}</span>
  <span><DisplayDate date={launchedAt} /></span>

  <div class="absolute bottom-0 left-1/3 right-0 top-0 -z-10">
    <MapThumbnail {map} />
  </div>
</a>

<style lang="postcss">
  .game-list-item {
    background: theme('colors.abru.light.15');
    background: linear-gradient(
      90deg,
      theme('colors.abru.light.15') 35%,
      theme('colors.transparent') 90%
    );

    &:hover {
      background: linear-gradient(
        90deg,
        theme('colors.abru.light.25') 35%,
        theme('colors.transparent') 90%
      );
    }
  }
</style>
