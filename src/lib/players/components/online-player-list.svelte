<script lang="ts">
  import { onlinePlayers, onlinePlayersSorted } from '../online-players.store';
  import { IconUserCircle } from '@tabler/icons-svelte';
  import { slide } from 'svelte/transition';
</script>

<div class="bg-abru-dark-6 flex h-full flex-col rounded-lg p-2">
  <div class="text-abru-light-75 my-3.5 flex flex-row justify-center gap-1">
    <IconUserCircle />
    <span class="text-sm font-bold">Players online: {$onlinePlayers.size}</span>
  </div>

  {#each $onlinePlayersSorted as player}
    <a
      href="/player/{player.steamId}"
      class="text-abru-light-75 even:bg-abru-dark-6 odd:bg-abru-light-5 rounded-sm px-2 py-1 text-center text-base font-light hover:underline lg:text-start"
      transition:slide|local
    >
      {player.name}
    </a>
  {/each}
</div>
