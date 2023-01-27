<script lang="ts">
  import type { Player } from '../models/player';
  import ExternalProfileLinkList from './external-profile-link-list.svelte';
  import { intlFormat } from 'date-fns';

  export let player: Player;

  $: joinedAt = player ? intlFormat(new Date(player.joinedAt)) : null;
</script>

<div class="mx-2 flex flex-col gap-4 md:flex-row">
  <img
    src={player.avatar.large}
    alt="{player.name}'s avatar"
    class="h-[184px] w-[184px] self-center"
  />

  <div class="flex flex-col self-center md:self-auto">
    <span class="font-caption text-6xl text-white">{player.name}</span>
    <span class="font-caption text-white">Joined {joinedAt}</span>
    <div class="grow" />

    <div class="hidden md:block">
      <ExternalProfileLinkList {player} />
    </div>
  </div>
</div>

<div class="mt-4 block md:hidden">
  <ExternalProfileLinkList {player} />
</div>
