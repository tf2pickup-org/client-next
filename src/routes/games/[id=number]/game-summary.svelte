<script lang="ts">
  import { profile } from '$lib/profile/profile.store';
  import GameLiveIndicator from '$lib/shared/components/game-live-indicator.svelte';
  import MapThumbnail from '$lib/shared/components/map-thumbnail.svelte';
  import { connectStringToLink } from '$lib/shared/connect-string-to-link';
  import ConnectString from '$lib/games/components/connect-string.svelte';
  import GameSummaryLink from './game-summary-link.svelte';
  import JoinGameButton from '$lib/games/components/join-game-button.svelte';
  import JoinGameTimer from './join-game-timer.svelte';
  import {
    IconDeviceDesktopAnalytics,
    IconEye,
    IconHeadset,
    IconLoader3,
    IconMovie,
    IconPlayerPlayFilled,
    IconX,
  } from '@tabler/icons-svelte';
  import { format } from 'date-fns';
  import { getContext } from 'svelte';
  import { derived, type Writable } from 'svelte/store';
  import type { ConnectInfo } from '$lib/games/types/connect-info';
  import type { Game } from '$lib/games/types/game';
  import JoinVoiceChannelButton from '$lib/games/components/join-voice-channel-button.svelte';

  const game = getContext<Writable<Game>>('game');
  const connectInfo = getContext<Writable<ConnectInfo | undefined>>('game.connectInfo');

  const isRunning = derived(game, $game =>
    ['created', 'configuring', 'launching', 'started'].includes($game.state),
  );
  const launchedAt = derived(game, $game => format(new Date($game.launchedAt), 'dd.MM.yyyy HH:mm'));
  const isMyGame = derived(
    [game, profile],
    ([$game, $profile]) =>
      $profile && $game.slots.some(slot => slot.player.id === $profile.player.id),
  );
</script>

<div class="text-abru-light-75 flex flex-col overflow-hidden rounded-lg">
  <div class="summary-caption relative flex min-h-[200px] flex-1 flex-col justify-end px-[10px]">
    <div class="absolute bottom-0 left-0 right-0 top-0 -z-10">
      <MapThumbnail map={$game.map} />
    </div>

    <div
      class="bg-abru/90 text-abru-light-75 absolute left-[10px] top-[10px] flex flex-row items-center gap-[3px] rounded px-[8px] py-[6px] text-base font-bold leading-4 shadow"
    >
      <span>#{$game.number}</span>
    </div>

    {#if $isRunning}
      <div
        class="bg-abru text-accent-600 absolute right-[10px] top-[10px] flex flex-row items-center gap-[3px] rounded px-[8px] py-[6px] text-base font-bold leading-4 shadow"
      >
        <GameLiveIndicator />
        <span class="uppercase">live</span>
      </div>
    {/if}

    {#if $game.state === 'interrupted'}
      <div
        class="bg-abru text-accent-600 absolute right-[10px] top-[10px] flex h-[28px] flex-row items-stretch gap-[3px] rounded px-[8px] py-[6px] shadow"
      >
        <IconX size={18} />
        <span class="text-sm font-bold leading-none">force-ended</span>
      </div>
    {/if}

    <div class="info">
      <span class="label">map</span>
      <span class="value">{$game.map}</span>
    </div>
  </div>
  <div class="bg-abru-dark-29 flex flex-col gap-[8px] p-[10px]">
    <div class="info">
      <span class="label">launched</span>
      <span class="value">{$launchedAt}</span>
    </div>

    {#if $isRunning}
      {#if $isMyGame}
        <div class="flex flex-col gap-2">
          {#if $connectInfo?.joinGameServerTimeout}
            <div class="info">
              <div class="label">join in</div>
              <JoinGameTimer timeout={new Date($connectInfo.joinGameServerTimeout)} />
            </div>
          {/if}

          <ConnectString connectString={$connectInfo?.connectString} />
          <JoinGameButton connectString={$connectInfo?.connectString}>
            {#if $connectInfo?.connectString}
              <IconPlayerPlayFilled size={16} />
              join game
            {:else}
              <IconLoader3 size={24} class="animate-spin" />
            {/if}
          </JoinGameButton>

          {#if $connectInfo?.voiceChannelUrl}
            <JoinVoiceChannelButton voiceChannelUrl={$connectInfo?.voiceChannelUrl}>
              <IconHeadset size={24} />
              join voice
            </JoinVoiceChannelButton>
          {/if}
        </div>
      {:else}
        <ConnectString connectString={$game.stvConnectString} />
        <JoinGameButton connectString={$game.stvConnectString}>
          {#if $game.stvConnectString}
            <IconEye size={24} />
            watch stv
          {:else}
            <IconLoader3 size={24} class="animate-spin" />
          {/if}
        </JoinGameButton>
      {/if}
    {/if}

    {#if $game.logsUrl}
      <GameSummaryLink href={$game.logsUrl}>
        <IconDeviceDesktopAnalytics />logs</GameSummaryLink
      >
    {/if}

    {#if $game.demoUrl}
      <GameSummaryLink href={$game.demoUrl}>
        <IconMovie />demo
      </GameSummaryLink>
    {/if}
  </div>
</div>

<style lang="postcss">
  .summary-caption {
    background: linear-gradient(
      180deg,
      theme('colors.transparent') 35%,
      theme('colors.abru.dark.29') 90%
    );
  }

  .info {
    display: flex;
    flex-flow: column nowrap;

    color: theme('colors.abru.light.75');

    .label {
      font-weight: 300;
    }

    .value {
      font-weight: 500;
    }
  }
</style>
