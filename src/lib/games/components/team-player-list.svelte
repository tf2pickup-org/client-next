<script lang="ts">
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';
  import type { GameSlot } from '../types/game-slot';
  import type { Tf2Team } from '../types/tf2-team';

  export let team: Tf2Team;
  export let score: number | undefined = undefined;
  export let slots: GameSlot[] = [];
</script>

<div class="flex flex-col gap-2">
  <div
    class:bg-team-blu={team === 'blu'}
    class:bg-team-red={team === 'red'}
    class="flex justify-between rounded-lg px-5 py-3.5 text-5xl font-bold text-gray-100"
    class:flex-row={team === 'blu'}
    class:flex-row-reverse={team === 'red'}
  >
    <span>{team.toUpperCase()}</span>
    <span>{score ?? ''}</span>
  </div>

  <div class="bg-abru-dark-29 flex flex-col gap-3 rounded-lg p-2.5">
    {#each slots as slot}
      <a
        href="/player/{slot.player.steamId}"
        class="bg-abru-light-75 hover:bg-abru-light-85 flex flex-row items-center gap-2.5 rounded p-2.5 transition-colors duration-75"
      >
        <GameClassIcon gameClass={slot.gameClass} size={24} />
        <img
          src={slot.player.avatar.medium}
          width="38"
          height="38"
          alt="{slot.player.name}'s avatar"
        />
        <span class="flex-1 text-xl font-medium">{slot.player.name}</span>
      </a>
    {/each}
  </div>
</div>
