<script lang="ts">
  import { onlinePlayers, onlinePlayersSorted } from '../online-players.store';
  import { IconUserCircle } from '@tabler/icons-svelte';
  import { slide } from 'svelte/transition';
</script>

<div class="flex h-full flex-col rounded-lg bg-abru-dark-6 p-2">
  <div class="my-3.5 flex flex-row justify-center gap-1 text-abru-light-75">
    <IconUserCircle />
    <span class="text-sm font-bold">Players online: {$onlinePlayers.size}</span>
  </div>

  {#each $onlinePlayersSorted as player}
    <a
      href="/players/{player.steamId}"
      class="rounded-sm px-2 py-1 text-center text-base font-light text-abru-light-75 odd:bg-abru-light-5 even:bg-abru-dark-6 hover:underline lg:text-start"
      transition:slide|local
    >
      {player.name}
    </a>
  {/each}
</div>
