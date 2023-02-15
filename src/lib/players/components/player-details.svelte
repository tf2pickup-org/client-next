<script lang="ts">
  import type { LinkedProfiles } from '../models/linked-profiles';
  import type { Player } from '../models/player';
  import ExternalProfileLinkList from './external-profile-link-list.svelte';
  import { IconUserPlus } from '@tabler/icons-svelte';
  import { intlFormat } from 'date-fns';

  export let player: Player;
  export let linkedProfiles: LinkedProfiles;

  $: joinedAt = intlFormat(new Date(player.joinedAt));
</script>

<div class="mx-2 flex flex-col gap-4 md:flex-row">
  <div class="h-[184px] w-[184px] self-center bg-slate-700">
    <img src={player.avatar.large} alt="{player.name}'s avatar" class="h-[184px] w-[184px]" />
  </div>

  <div class="flex flex-col items-center self-center md:items-start md:self-auto">
    <span
      class="overflow-ellipsis whitespace-nowrap text-center font-caption text-6xl text-white md:text-start"
      >{player.name}</span
    >
    <span
      class="flex flex-row flex-nowrap items-center gap-1 text-center font-caption text-white md:text-start"
    >
      <IconUserPlus size={20} />
      {joinedAt}
    </span>
    <div class="grow" />

    <div class="hidden md:block">
      <ExternalProfileLinkList {player} {linkedProfiles} />
    </div>
  </div>
</div>

<div class="mt-4 block md:hidden">
  <ExternalProfileLinkList {player} {linkedProfiles} />
</div>
