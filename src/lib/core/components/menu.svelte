<script lang="ts">
  import { page } from '$app/stores';
  import { PUBLIC_DISCORD_INVITATION } from '$env/static/public';
  import { profile } from '$lib/profile/profile.store';
  import MenuItem from './menu-item.svelte';
  import Profile from './profile.svelte';
  import SteamButton from './steam-button.svelte';
  import { IconBrandDiscord, IconChartPieFilled, IconCrown, IconHeart } from '@tabler/icons-svelte';
</script>

<div class="flex flex-col gap-[10px] px-4 lg:flex-row lg:items-center lg:px-0">
  <MenuItem href="/games" active={$page.url.pathname === '/games'}>Games</MenuItem>
  <MenuItem href="/players" active={$page.url.pathname === '/players'}>Players</MenuItem>
  <MenuItem href="/rules" active={$page.url.pathname === '/rules'}>Rules</MenuItem>

  <MenuItem href="/hall-of-fame" active={$page.url.pathname === '/hall-of-fame'}>
    <IconCrown size={36} class="lg:hidden" />
    <IconCrown size={24} stroke={1.5} class="hidden lg:block" />
    HOF
  </MenuItem>

  <MenuItem href="/statistics" active={$page.url.pathname === '/statistics'}>
    <IconChartPieFilled size={36} class="lg:hidden" />
    <IconChartPieFilled size={24} stroke={1.5} class="hidden lg:block" />
    Stats
  </MenuItem>

  <div class="hidden w-8 xl:block" />

  <a
    href={PUBLIC_DISCORD_INVITATION}
    class="hidden text-abru-light-75 hover:text-slate-200 xl:inline-block"
    target="_blank"
  >
    <IconBrandDiscord size={32} stroke={1.5} />
  </a>

  <a
    href="https://ko-fi.com/tf2pickuporg"
    class="hidden text-abru-light-75 hover:text-slate-200 xl:inline-block"
    target="_blank"
  >
    <IconHeart size={32} stroke={1.5} />
  </a>

  <div class="hidden w-2 lg:block" />
  <div class="my-2 h-[2px] grow bg-abru-light-15 lg:hidden" />

  {#if $profile}
    <Profile {...$profile.player} />
  {:else}
    <SteamButton />
  {/if}
</div>
