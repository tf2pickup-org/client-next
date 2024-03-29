<script lang="ts">
  import GameClassIcon from '$lib/shared/components/game-class-icon.svelte';
  import { Tf2ClassName } from '$lib/shared/tf2-class-name';
  import type { LinkedProfile } from '../types/linked-profile';
  import type { Player } from '../types/player';
  import type { PlayerStats } from '../types/player-stats';
  import PlayerPresentationLink from './player-presentation-link.svelte';
  import {
    IconAlignBoxBottomRight,
    IconBrandSteam,
    IconBrandTwitch,
    IconStars,
  } from '@tabler/icons-svelte';
  import { format } from 'date-fns';
  import { getContext } from 'svelte';
  import { derived, type Writable } from 'svelte/store';

  const player = getContext<Writable<Player>>('player');
  const stats = getContext<Writable<PlayerStats>>('player.stats');
  const linkedProfiles = getContext<Writable<LinkedProfile[]>>('player.linkedProfiles');
  const twitchTvProfile = derived(linkedProfiles, $profiles =>
    $profiles.find(profile => profile.provider === 'twitch.tv'),
  );

  let joinedAtText: string;
  let isAdmin: boolean;

  $: {
    joinedAtText = format(
      typeof $player.joinedAt === 'string' ? new Date($player.joinedAt) : $player.joinedAt,
      'MMMM dd, yyyy',
    );
    isAdmin = $player.roles.includes('admin');
  }
</script>

<div class="flex flex-row gap-[10px] rounded-lg bg-abru-dark-29 p-[10px] text-abru-light-75">
  <img
    src={$player.avatar.large}
    width="184"
    height="184"
    class="h-[184px] w-[184px] rounded"
    alt="{$player.name}'s avatar"
  />

  <div class="flex grow flex-col justify-between p-[22px]">
    <div class="flex grow flex-row gap-[10px]">
      <span class="-mt-[6px] text-[48px] font-bold leading-none">{$player.name}</span>
      {#if isAdmin}
        <span
          class="my-2 self-baseline rounded-[3px] bg-alert px-[8px] py-[6px] font-bold leading-none text-abru-light-3"
          >admin</span
        >
      {/if}

      <div class="grow" />

      <div class="flex flex-col">
        <span class="text-base font-light">Joined:</span>
        <span class="text-2xl font-bold">{joinedAtText}</span>
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <div class="grid grid-flow-col grid-rows-2 place-items-center gap-x-6">
        <span class="text-base font-light">Total games played:</span>
        {#if $stats}
          <span class="justify-self-start text-2xl font-bold">{$stats.gamesPlayed}</span>
        {:else}
          <div class="flex h-8 flex-row items-end justify-self-start">
            <div class="h-7 w-[50px] animate-pulse rounded bg-abru-light-10" />
          </div>
        {/if}

        <div class="row-span-2 mx-2 h-[48px] w-[2px] bg-abru-light-15" />

        {#each [Tf2ClassName.scout, Tf2ClassName.soldier, Tf2ClassName.demoman, Tf2ClassName.medic] as gameClass}
          <GameClassIcon {gameClass} size={32} />
          {#if $stats}
            <span class="min-w-[60px] text-center text-2xl font-bold"
              >{$stats.classesPlayed?.[gameClass] ?? 0}</span
            >
          {:else}
            <div class="flex h-8 min-w-[60px] flex-row items-end justify-center">
              <div class="h-7 w-[55px] animate-pulse rounded bg-abru-light-10" />
            </div>
          {/if}
        {/each}
      </div>

      <div class="flex flex-row gap-[10px]">
        <PlayerPresentationLink href="https://steamcommunity.com/profiles/{$player.steamId}">
          <IconBrandSteam /><span>steam</span>
        </PlayerPresentationLink>

        <PlayerPresentationLink href="https://logs.tf/profile/{$player.steamId}">
          <IconAlignBoxBottomRight /><span>logs</span>
        </PlayerPresentationLink>

        {#if $player.etf2lProfileId}
          <PlayerPresentationLink href="https://etf2l.org/forum/user/{$player.etf2lProfileId}">
            <IconStars /><span>etf2l</span>
          </PlayerPresentationLink>
        {/if}

        {#if $twitchTvProfile}
          <PlayerPresentationLink href="https://www.twitch.tv/{$twitchTvProfile.login}/">
            <IconBrandTwitch /><span>twitch</span>
          </PlayerPresentationLink>
        {/if}
      </div>
    </div>
  </div>
</div>
