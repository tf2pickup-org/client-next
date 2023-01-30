<script lang="ts">
  import type { GameSlot } from '$lib/games/models/game-slot';
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';
  import Steam from 'svelte-material-icons/Steam.svelte';
  import SwordCross from 'svelte-material-icons/SwordCross.svelte';

  export let gameSlot: GameSlot;
</script>

<div class="flex flex-col bg-white/80 text-primary">
  <div class="flex flex-row gap-2 p-1">
    <img
      src={gameSlot.player.avatar.medium}
      alt="{gameSlot.player.name}'s avatar"
      height="64"
      width="64"
      class="h-12 w-12 xl:h-14 xl:w-14"
    />
    <div class="flex flex-col">
      <a
        class="self-center font-caption text-3xl xl:self-start"
        href="/player/{gameSlot.player.steamId}">{gameSlot.player.name}</a
      >
      <div class="flex items-center gap-0.5 text-sm">
        <SwordCross size={15} />{gameSlot.player.gamesPlayed}
      </div>
    </div>
    <div class="grow" />
    <div class="self-center xl:self-start">
      <GameClassIcon gameClass={gameSlot.gameClass} size={32} />
    </div>
  </div>

  <div class="mx-1 hidden h-px bg-primary xl:block" />

  <div class="hidden flex-row p-1 xl:flex">
    <a
      href="https://steamcommunity.com/profiles/{gameSlot.player.steamId}"
      target="_blank"
      rel="noreferrer"
    >
      <Steam size="24" />
    </a>
  </div>
</div>
