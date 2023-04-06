<script lang="ts">
  import logo from '$lib/assets/logo.png';
  import signInThroughSteam from '$lib/assets/signinthroughsteam.png';
  import Link from './link.svelte';
  import { IconBrandDiscord, IconHeart, IconCrown, IconChartPieFilled } from '@tabler/icons-svelte';
</script>

<nav class="flex h-[95px] flex-row">
  <div class="container mx-auto flex flex-row items-center justify-between self-center">
    <a href="/" class="mx-1 self-center">
      <img alt="tf2pickup.pl logo" src={logo} height="120" class="h-[44px] object-contain" />
    </a>

    <div class="hidden flex-row items-center gap-8 text-lg font-medium lg:flex">
      <Link href="/games">Games</Link>

      <Link href="/players">Players</Link>

      <Link href="/rules">Rules</Link>

      <Link href="/hall-of-fame">
        <IconCrown size={24} />
        HOF
      </Link>

      <Link href="/stats">
        <IconChartPieFilled size={24} />
        Stats
      </Link>

      <div class="w-8" />

      <a
        href="https://discord.gg/UVFVfc4"
        class="text-abru-100 hover:text-slate-200"
        target="_blank"
      >
        <IconBrandDiscord size={32} />
      </a>

      <a
        href="https://ko-fi.com/tf2pickuporg"
        class="text-abru-100 hover:text-slate-200"
        target="_blank"
      >
        <IconHeart size={32} />
      </a>

      <div class="w-2" />

      <a href="/auth/steam">
        <img alt="Sign in through Steam" src={signInThroughSteam} />
      </a>
    </div>
  </div>
</nav>
