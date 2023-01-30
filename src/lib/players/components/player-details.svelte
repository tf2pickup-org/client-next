<script lang="ts">
  import type { LinkedProfiles } from '../models/linked-profiles';
  import type { Player } from '../models/player';
  import ExternalProfileLinkList from './external-profile-link-list.svelte';
  import { intlFormat } from 'date-fns';

  export let player: Player | undefined = undefined;
  export let linkedProfiles: LinkedProfiles | undefined = undefined;

  $: joinedAt = player ? intlFormat(new Date(player.joinedAt)) : null;
</script>

<div class="mx-2 flex flex-col gap-4 md:flex-row">
  <div class="h-[184px] w-[184px] self-center bg-slate-700" class:animate-pulse={!player}>
    {#if player}
      <img src={player.avatar.large} alt="{player.name}'s avatar" class="h-[184px] w-[184px]" />
    {/if}
  </div>

  <div class="flex flex-col self-center md:self-auto">
    {#if player}
      <span
        class="overflow-ellipsis whitespace-nowrap text-center font-caption text-6xl text-white md:text-start"
        >{player?.name}</span
      >
      <span class="text-center font-caption text-white md:text-start">Joined {joinedAt}</span>
    {:else}
      <div class="my-1 h-14 w-36 animate-pulse rounded bg-slate-700" />
      <div class="my-1 h-6 w-36 animate-pulse rounded bg-slate-700" />
    {/if}
    <div class="grow" />

    <div class="hidden md:block">
      <ExternalProfileLinkList {player} {linkedProfiles} />
    </div>
  </div>
</div>

<div class="mt-4 block md:hidden">
  <ExternalProfileLinkList {player} {linkedProfiles} />
</div>
