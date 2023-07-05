<script lang="ts">
  import { paginate, type PaginationLink } from './paginate';
  import { createEventDispatcher } from 'svelte';

  export let currentPage: number = 1;
  export let itemsPerPage: number = 10;
  export let itemCount: number = 0;

  const dispatch = createEventDispatcher();
  let links: PaginationLink[] = [];

  const dispatchPageChange = (event: Event, page: number) => {
    event.preventDefault();
    dispatch('pageChange', { page });
    return false;
  };

  $: links = paginate(currentPage, itemsPerPage, itemCount);
</script>

<div class="flex h-12 flex-row flex-nowrap items-center justify-center gap-3 text-lg text-white">
  {#each links as link}
    <a
      href={null}
      class="cursor-pointer"
      class:font-bold={currentPage === link.page}
      on:click={event => dispatchPageChange(event, link.page)}
    >
      {link.label}
    </a>
  {/each}
</div>
