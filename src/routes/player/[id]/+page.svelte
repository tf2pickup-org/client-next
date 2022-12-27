<script lang="ts">
  import type { Game } from '$lib/games/models/game';
  import ExternalProfileLinks from '$lib/players/components/external-profile-links.svelte';
  import PlayerGameList from '$lib/players/components/player-game-list.svelte';
  import PlayerStats from '$lib/players/components/player-stats.svelte';
  import type { Player } from '$lib/players/models/player';
  import type { PlayerStats as PlayerStatsType } from '$lib/players/models/player-stats';
  import type { PaginatedList } from '$lib/shared/models/paginated-list';
  import { intlFormat } from 'date-fns';

  export let data: {
    player: Player;
    stats: PlayerStatsType;
    games: PaginatedList<Game>;
  };

  $: joinedAt = intlFormat(new Date(data.player.joinedAt));
</script>

<div class="container mx-auto flex flex-row flex-nowrap">
  <ExternalProfileLinks />

  <div class="flex-grow flex flex-col">
    <div class="flex flex-row flex-nowrap">
      <img
        src={data.player.avatar.large}
        alt="{data.player.name}'s avatar"
        class="block border border-gray-500 m-5 w-[128px] h-[128px]"
      />
      <div class="flex flex-col text-on-primary my-5">
        <span class="text-4xl font-semibold my-2">{data.player.name}</span>
        <div>
          <span class="font-bold mx-1">joined: </span>{joinedAt}
        </div>
      </div>
    </div>

    <PlayerStats stats={data.stats} />
  </div>

  <div class="flex-grow flex flex-col p-5">
    <div class="text-center text-white my-2">games</div>
    <PlayerGameList games={data.games.results} playerId={data.player.id} />
  </div>
</div>
