<script lang="ts">
  import type { PlayerAvatar } from '$lib/players/types/player-avatar';
  import { IconAwardFilled } from '@tabler/icons-svelte';

  export let place: number;
  export let steamId: string;
  export let name: string;
  export let avatar: PlayerAvatar;
  export let count: number;
</script>

<a
  class="hof-record"
  href="/players/{steamId}"
  class:is-1st={place === 1}
  class:is-2nd={place === 2}
  class:is-3rd={place === 3}
>
  {#if place === 1}
    <IconAwardFilled size={32} class="text-place-1st place-self-center"></IconAwardFilled>
  {:else if place === 2}
    <IconAwardFilled size={32} class="text-place-2nd place-self-center"></IconAwardFilled>
  {:else if place === 3}
    <IconAwardFilled size={32} class="text-place-3rd place-self-center"></IconAwardFilled>
  {:else}
    <span class="place-self-center">{place}.</span>
  {/if}

  <img src={avatar.medium} width="64" height="64" class="h-[38px] w-[38px]" alt="{name}'s avatar" />
  <span>{name}</span>
  <span class="justify-self-end">{count}</span>
</a>

<style lang="postcss">
  .hof-record {
    @apply transition-colors;
    @apply duration-75;

    display: grid;
    grid-column: span 4 / span 4;
    grid-template-columns: subgrid;
    border-radius: 4px;
    align-items: center;
    padding: 0px 8px 0px 0px;

    &:hover {
      background-color: theme('colors.abru.light.5 / 40%');
    }

    &.is-1st,
    &.is-2nd,
    &.is-3rd {
      padding: 10px 8px 10px 10px;
    }

    &.is-1st {
      background-color: theme('colors.abru.light.15');
      &:hover {
        background-color: darken(theme('colors.abru.light.15'), 2%);
      }
    }

    &.is-2nd {
      background-color: theme('colors.abru.light.10');
      &:hover {
        background-color: darken(theme('colors.abru.light.10'), 2%);
      }
    }

    &.is-3rd {
      background-color: theme('colors.abru.light.5');
      &:hover {
        background-color: darken(theme('colors.abru.light.5'), 2%);
      }
    }
  }
</style>
