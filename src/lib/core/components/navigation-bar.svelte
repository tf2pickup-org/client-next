<script lang="ts">
  import { page } from '$app/stores';
  import logo from '$lib/assets/logo.png';
  import signInThroughSteam from '$lib/assets/signinthroughsteam.png';
  import { profile } from '$lib/profile/profile.store';
  import Link from './link.svelte';
  import Profile from './profile.svelte';
  import { IconBrandDiscord, IconHeart, IconCrown, IconChartPieFilled } from '@tabler/icons-svelte';

  let path: string;

  $: path = $page.url.pathname;
</script>

<nav class="flex min-h-[95px] flex-row">
  <div class="container mx-auto flex flex-row items-center justify-between self-center">
    <a href="/" class="mx-1 self-center">
      <img alt="tf2pickup.pl logo" src={logo} height="120" class="h-[44px] object-contain" />
    </a>

    <div class="hidden flex-row items-center gap-5 text-lg font-medium lg:flex">
      <Link href="/games" active={path === '/games'}>Games</Link>
      <Link href="/players" active={path === '/players'}>Players</Link>
      <Link href="/rules" active={path === '/rules'}>Rules</Link>

      <Link href="/hall-of-fame" active={path === '/hall-of-fame'}>
        <IconCrown size={24} />
        HOF
      </Link>

      <Link href="/stats" active={path === '/stats'}>
        <IconChartPieFilled size={24} />
        Stats
      </Link>

      <div class="w-8" />

      <a
        href="https://discord.gg/UVFVfc4"
        class="text-abru-light-75 hover:text-slate-200"
        target="_blank"
      >
        <IconBrandDiscord size={32} stroke={1.5} />
      </a>

      <a
        href="https://ko-fi.com/tf2pickuporg"
        class="text-abru-light-75 hover:text-slate-200"
        target="_blank"
      >
        <IconHeart size={32} stroke={1.5} />
      </a>

      <div class="w-2" />

      {#if $profile}
        <Profile {...$profile.player} />
      {:else}
        <a href="/auth/steam">
          <img alt="Sign in through Steam" src={signInThroughSteam} />
        </a>
      {/if}
    </div>
  </div>
</nav>
