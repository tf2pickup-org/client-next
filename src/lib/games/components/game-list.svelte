<script lang="ts">
  import type { PaginatedList } from '$lib/shared/models/paginated-list';
  import type { Game } from '../models/game';
  import { format } from 'date-fns';

  export let games: PaginatedList<Game>;
</script>

<div class="flex flex-col gap-4 px-2">
  {#each games.results as game}
    {@const launchedAt = format(new Date(game.launchedAt), 'dd.MM.yyyy HH:mm')}
    {@const thumbnailUrl = `https://mapthumbnails.tf2pickup.org/unsafe/960x84/${
      game.map.split('_')[1]
    }.jpg`}
    {@const xlThumbnailUrl = `https://mapthumbnails.tf2pickup.org/unsafe/312x144/${
      game.map.split('_')[1]
    }.jpg`}
    <a
      href="/game/{game.number}"
      class="flex md:h-36 flex-col md:flex-row flex-nowrap items-center justify-between bg-white/50 md:bg-white/90 transition-colors hover:bg-white relative"
    >
      <div class="block md:hidden absolute top-0 bottom-0 left-0 right-0 -z-10 bg-center bg-no-repeat bg-cover"
        style="background-image: url({thumbnailUrl})"
      >
      </div>

      <div class="mx-8 font-caption text-2xl md:text-4xl xl:text-6xl">#{game.number}</div>
      <div class="md:text-xl xl:text-2xl">{launchedAt}</div>

      <div class="flex h-full w-[312px] flex-col relative">
        <img src={xlThumbnailUrl} alt="Map thumbnail" class="hidden md:block absolute top-0 bottom-0 left-0 right-0" height="84" loading="lazy" />
        <div class="grow" />
        <div class="md:bg-white/80 text-center font-caption text-lg z-10">{game.map}</div>
      </div>
    </a>
  {/each}
</div>
