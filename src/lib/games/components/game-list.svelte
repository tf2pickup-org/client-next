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
      class="relative flex flex-col flex-nowrap items-center justify-between bg-white/50 transition-colors hover:bg-white md:h-36 md:flex-row md:bg-white/90"
    >
      <div
        class="absolute top-0 bottom-0 left-0 right-0 -z-10 block bg-cover bg-center bg-no-repeat md:hidden"
        style="background-image: url({thumbnailUrl})"
      />

      <div class="mx-8 font-caption text-2xl md:text-4xl xl:text-6xl">#{game.number}</div>
      <div class="md:text-xl xl:text-2xl">{launchedAt}</div>

      <div class="relative flex h-full w-[312px] flex-col">
        <img
          src={xlThumbnailUrl}
          alt="Map thumbnail"
          class="absolute top-0 bottom-0 left-0 right-0 hidden md:block"
          height="84"
          loading="lazy"
        />
        <div class="grow" />
        <div class="z-10 text-center font-caption text-lg md:bg-white/80">{game.map}</div>
      </div>
    </a>
  {/each}
</div>
