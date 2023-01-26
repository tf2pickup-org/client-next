<script lang="ts">
  import { apiUrl } from '$environment';
  import type { Game } from '$lib/games/models/game';
  import { fetchPlayer } from '$lib/players/api/fetch-player';
  import { fetchPlayerStats } from '$lib/players/api/fetch-player-stats';
  import ExternalProfileLinkList from '$lib/players/components/external-profile-link-list.svelte';
  import PlayerGameList from '$lib/players/components/player-game-list.svelte';
  import PlayerStats from '$lib/players/components/player-stats.svelte';
  import type { Player } from '$lib/players/models/player';
  import type { PlayerStats as PlayerStatsType } from '$lib/players/models/player-stats';
  import type { PaginatedList } from '$lib/shared/models/paginated-list';
  import { intlFormat } from 'date-fns';
  import { onMount } from 'svelte';

  export let data: {
    playerId: string;
  };

  let player: Player;
  let stats: PlayerStatsType;
  let games: PaginatedList<Game>;

  onMount(async () => {
    await Promise.all([
      (async () => (player = await fetchPlayer(data.playerId)))(),
      (async () => (stats = await fetchPlayerStats(data.playerId)))(),
    ]);

    const res = await fetch(`${apiUrl}/games?playerId=${player.id}`);
    if (res.ok) {
      games = await res.json();
    }
  });

  $: joinedAt = player ? intlFormat(new Date(player.joinedAt)) : null;
</script>

{#if player}
  <div class="container mx-auto mt-5 flex flex-col flex-nowrap gap-8 lg:flex-row">
    <ExternalProfileLinkList {player} />

    <div class="flex flex-grow flex-col gap-5 px-4 md:px-0">
      <div class="flex flex-row flex-nowrap gap-5">
        <img
          src={player.avatar.large}
          alt="{player.name}'s avatar"
          class="block h-[128px] w-[128px] border border-gray-500"
        />
        <div class="flex flex-col text-on-primary">
          <span class="my-2 text-4xl font-semibold">{player.name}</span>
          <div>
            <span class="mx-1 font-bold">joined: </span>{joinedAt}
          </div>
        </div>
      </div>

      {#if stats}
        <PlayerStats {stats} />
      {/if}
    </div>

    <div class="flex flex-grow flex-col">
      <div class="text-center text-white">games</div>
      {#if games}
        <PlayerGameList games={games.results} playerId={player.id} />
      {/if}
    </div>
  </div>
{/if}
