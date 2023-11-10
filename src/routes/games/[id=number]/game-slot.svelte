<script lang="ts">
  import type { Game } from '$lib/games/types/game';
  import type { GameSlot } from '$lib/games/types/game-slot';
  import { profile } from '$lib/profile/profile.store';
  import { IconLock, IconPlus } from '@tabler/icons-svelte';
  import { createEventDispatcher, getContext } from 'svelte';
  import { derived, type Writable } from 'svelte/store';

  export let slot: GameSlot;
  export let side: 'left' | 'right';

  const game = getContext<Writable<Game>>('game');
  const isRunning = derived(game, $game =>
    ['created', 'configuring', 'launching', 'started'].includes($game.state),
  );

  const restricted = derived(profile, $profile =>
    $profile?.restrictions?.some(r => r.gameClasses?.some(gc => gc === slot.gameClass)),
  );

  const dispatch = createEventDispatcher();
</script>

{#if slot.status === 'active'}
  <a
    href="/players/{slot.player.steamId}"
    class="bg-abru-light-75 hover:bg-abru-light-70 flex items-center gap-2.5 rounded p-2.5 transition-colors duration-75"
    class:flex-row={side === 'right'}
    class:flex-row-reverse={side === 'left'}
  >
    <img src={slot.player.avatar.medium} width="38" height="38" alt="{slot.player.name}'s avatar" />
    <span class="flex-1 text-xl font-medium" class:text-end={side === 'left'}
      >{slot.player.name}</span
    >

    {#if $isRunning}
      <div
        class="-m-1 w-[6px] self-stretch rounded"
        class:online={slot.connectionStatus === 'connected'}
        class:joining={slot.connectionStatus === 'joining'}
        class:offline={slot.connectionStatus === 'offline'}
      />
    {/if}
  </a>
{:else if slot.status === 'waiting for substitute'}
  <button
    class="join-substitute-button"
    disabled={$restricted}
    on:click={() => dispatch('replacePlayer', { gameId: $game.id, replaceeId: slot.player.id })}
  >
    {#if $restricted}
      <IconLock size={32} />
    {:else}
      <IconPlus size={32} />
    {/if}
  </button>
{/if}

<style lang="postcss">
  .join-substitute-button {
    @apply transition-colors;
    @apply duration-75;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    height: 58px;

    background-color: theme('colors.abru.light.30');
    color: theme('colors.abru.light.60');
    border-radius: 4px;

    &:hover {
      background-color: lighten(theme('colors.abru.light.30'), 2%);
    }
  }

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
