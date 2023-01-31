<script lang="ts">
  import { groupPlayers, type PlayerGroup } from '../group-players';
  import type { Player } from '../models/player';

  export let players: Player[] | undefined;

  let playerGroups: PlayerGroup[];

  $: playerGroups = groupPlayers(players ?? []);
</script>

<div class="bg-white/80 py-2 px-4 sm:py-8 sm:px-10 xl:py-12 xl:px-16">
  {#each playerGroups as group}
    <h3 class="font-caption text-6xl">{group.key}</h3>
    <div class="mb-6 border-b border-black py-4">
      <ul class="list-none px-4">
        {#each group.players as player}
          <li>
            <a href="/player/{player.steamId}">{player.name}</a>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>
