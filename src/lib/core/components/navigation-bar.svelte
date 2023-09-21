<script lang="ts">
  import logo from '$lib/assets/logo.png';
  import Menu from './menu.svelte';
  import { IconMenu2, IconX } from '@tabler/icons-svelte';
  import { fly } from 'svelte/transition';

  let menuOpen = false;
</script>

<nav
  class="flex min-h-[95px] flex-row transition-colors duration-100"
  class:bg-abru-light-3={menuOpen}
>
  {#if menuOpen}
    <div
      class="bg-abru-light-3 absolute left-0 right-0 top-[95px] z-50"
      transition:fly={{ y: -15 }}
    >
      <Menu />
    </div>
  {/if}

  <div class="container mx-auto flex flex-row items-center justify-between self-center">
    <a href="/" class="mx-4 self-center md:mx-1">
      <img alt="tf2pickup.pl logo" src={logo} height="120" class="h-[44px] object-contain" />
    </a>

    <button class="text-abru-light-75 mx-4 lg:hidden" on:click={() => (menuOpen = !menuOpen)}>
      {#if menuOpen}
        <IconX size={48} />
      {:else}
        <IconMenu2 size={48} />
      {/if}
    </button>

    <div class="hidden flex-row items-center gap-5 font-medium lg:flex">
      <Menu />
    </div>
  </div>
</nav>
