<script lang="ts">
  import type { PlayerAvatar } from '$lib/players/types/player-avatar';
  import { IconAwardFilled } from '@tabler/icons-svelte';

  export let place: number;
  export let steamId: string;
  export let name: string;
  export let avatar: PlayerAvatar;
  export let count: number;
</script>

<a class="hof-record" href="/players/{steamId}">
  {#if place === 1}
    <IconAwardFilled size={32} class="text-place-1st place-self-center"></IconAwardFilled>
  {:else if place === 2}
    <IconAwardFilled size={32} class="text-place-2nd place-self-center"></IconAwardFilled>
  {:else if place === 3}
    <IconAwardFilled size={32} class="text-place-3rd place-self-center"></IconAwardFilled>
  {:else}
    <span class="place-self-center">{place}.</span>
  {/if}
  <img src={avatar.medium} width="64" height="64" class="w-[38px] h-[38px]" alt="{name}'s avatar" />
  <span>{name}</span>
  <span class="place-self-end">{count}</span>
</a>

<style lang="postcss">
  .hof-record {
    display: grid;
    grid-column: span 4 / span 4;
    grid-template-columns: subgrid;
  }
</style>
