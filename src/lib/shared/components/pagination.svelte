<script lang="ts">
  import { paginate, PaginationRole, type PaginationLink } from './paginate';
  import { IconChevronLeft, IconChevronRight } from '@tabler/icons-svelte';
  import { createEventDispatcher } from 'svelte';

  export let currentPage: number = 1;
  export let itemsPerPage: number = 10;
  export let itemCount: number = 0;

  const dispatch = createEventDispatcher();
  let links: PaginationLink[] = [];
  let lastPage: number;

  const dispatchPageChange = (event: Event, page: number) => {
    event.preventDefault();
    dispatch('pageChange', { page });
    return false;
  };

  $: {
    links = paginate(currentPage, itemsPerPage, itemCount);
    lastPage = Math.ceil(itemCount / itemsPerPage);
  }
</script>

<div class="flex h-12 flex-row flex-nowrap items-center gap-2 text-lg text-white">
  <a
    href={null}
    class="page"
    class:page--disabled={currentPage <= 1}
    on:click={event => dispatchPageChange(event, currentPage - 1)}
  >
    <IconChevronLeft />
  </a>

  {#each links.filter(l => l.role === PaginationRole.direct) as link}
    <a
      href={null}
      class="page"
      class:active-page={currentPage === link.page}
      on:click={event => dispatchPageChange(event, link.page)}
    >
      <span class="px-[10px]">
        {link.page}
      </span>
    </a>
  {/each}

  <a
    href={null}
    class="page"
    class:page--disabled={currentPage >= lastPage}
    on:click={event => dispatchPageChange(event, currentPage + 1)}
  >
    <IconChevronRight />
  </a>
</div>

<style lang="postcss">
  .page {
    height: 32px;
    min-width: 28px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    vertical-align: middle;
    font-weight: 500;
    border-radius: 4px;
    color: theme('colors.white');
    cursor: pointer;

    &:hover {
      background-color: theme('colors.abru.light.10');
    }
  }

  .active-page {
    background-color: theme('colors.abru.light.15');
  }

  .page--disabled {
    color: theme('colors.abru.light.15');
    cursor: default;

    &:hover {
      background-color: initial;
    }
  }
</style>
