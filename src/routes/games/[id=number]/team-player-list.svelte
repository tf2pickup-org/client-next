<script lang="ts">
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';
  import { tf2ClassOrder } from '$lib/shared/tf2-class-order';
  import type { Game } from '$lib/games/types/game';
  import type { GameSlot } from '$lib/games/types/game-slot';
  import type { Tf2Team } from '$lib/games/types/tf2-team';
  import { getContext } from 'svelte';
  import { derived, type Writable } from 'svelte/store';

  export let team: Tf2Team;

  const slotsForTeam = (slots: GameSlot[], team: Tf2Team) =>
    slots
      .filter(slot => ['active', 'waiting for substitute'].includes(slot.status))
      .filter(slot => slot.team === team)
      .sort((a, b) => tf2ClassOrder[b.gameClass] - tf2ClassOrder[a.gameClass]);

  const game = getContext<Writable<Game>>('game');
  const score = derived(game, $game => $game.score?.[team]);
  const slots = derived(game, $game => slotsForTeam($game.slots, team));
  const isRunning = derived(game, $game =>
    ['created', 'configuring', 'launching', 'started'].includes($game.state),
  );
</script>

<div class="flex flex-col gap-2">
  <div
    class:bg-team-blu={team === 'blu'}
    class:bg-team-red={team === 'red'}
    class="text-ash flex justify-between rounded-lg px-5 py-3.5 text-5xl font-bold"
    class:flex-row={team === 'blu'}
    class:flex-row-reverse={team === 'red'}
  >
    <span>{team.toUpperCase()}</span>
    <span>{$score ?? ''}</span>
  </div>

  <div class="bg-abru-dark-29 flex flex-col gap-3 rounded-lg p-2.5">
    {#each $slots as slot}
      <a
        href="/players/{slot.player.steamId}"
        class="bg-abru-light-75 hover:bg-abru-light-70 flex flex-row items-center gap-2.5 rounded p-2.5 transition-colors duration-75"
      >
        <GameClassIcon gameClass={slot.gameClass} size={24} />
        <img
          src={slot.player.avatar.medium}
          width="38"
          height="38"
          alt="{slot.player.name}'s avatar"
        />
        <span class="flex-1 text-xl font-medium">{slot.player.name}</span>

        {#if $isRunning}
          <div
            class="-m-1 w-[6px] self-stretch rounded"
            class:online={slot.connectionStatus === 'connected'}
            class:joining={slot.connectionStatus === 'joining'}
            class:offline={slot.connectionStatus === 'offline'}
          />
        {/if}
      </a>
    {/each}
  </div>
</div>

<style lang="postcss">
  .online {
    background-color: #0a955b;
  }

  .joining {
    background-color: #d9861a;
  }

  .offline {
    background-color: #b80c4d;
  }
</style>
