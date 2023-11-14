<script lang="ts">
  import { IconCopy } from '@tabler/icons-svelte';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { Game } from '../types/game';
  import type { GameState } from '../types/game-state';

  const game = getContext<Writable<Game>>('game');

  export let connectString: string | undefined;

  let stateDescription: string;

  $: stateDescription = gameStateToDescription($game.state);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => console.log('copied!'));
  };

  const gameStateToDescription = (state: GameState) => {
    switch (state) {
      case 'created':
        return 'waiting for server...';

      case 'configuring':
        return 'configuring server...';

      default:
        return '';
    }
  };
</script>

<div
  class="border-abru-light-25 bg-abru-light-5 text-abru-light-75 flex flex-row gap-4 rounded border px-3 py-[10px] text-base font-medium"
>
  <div
    class="bg-abru-light-5 text-abru-light-75 fade block flex-1 cursor-text select-all overflow-hidden whitespace-nowrap text-base"
    class:italic={!connectString}
  >
    {connectString ?? stateDescription}
  </div>

  {#if connectString}
    <button on:click={() => copyToClipboard(connectString ?? '')} class="hover:text-abru-light-85">
      <IconCopy size={24} />
    </button>
  {/if}
</div>

<style lang="postcss">
  .fade {
    mask-image: linear-gradient(90deg, #000 80%, transparent);
  }
</style>
