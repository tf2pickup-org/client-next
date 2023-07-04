<script lang="ts">
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';
  import type { GameSlot } from '../types/game-slot';
  import type { Tf2Team } from '../types/tf2-team';

  export let team: Tf2Team;
  export let score: number | undefined = undefined;
  export let slots: GameSlot[] = [];
</script>

<div class="flex flex-col">
  <div
    class:bg-team-blu={team === 'blu'}
    class:bg-team-red={team === 'red'}
    class="flex flex-row justify-between rounded-t-lg px-6 py-4 text-5xl font-bold text-white"
  >
    <span>{team.toUpperCase()}</span>
    <span>{score ?? ''}</span>
  </div>

  <div class="bg-abru-dark-29 flex flex-col gap-3 rounded-b-lg p-3">
    {#each slots as slot}
      <a
        href="/player/{slot.player.steamId}"
        class="bg-abru-light-75 hover:bg-abru-light-85 flex flex-row items-center gap-2 rounded p-2 transition-colors duration-75"
      >
        <GameClassIcon gameClass={slot.gameClass} size={24} />
        <img src={slot.player.avatar.medium} width="38" alt="{slot.player.name}'s avatar" />
        <span class="flex-1 text-xl font-medium">{slot.player.name}</span>
      </a>
    {/each}
  </div>
</div>
