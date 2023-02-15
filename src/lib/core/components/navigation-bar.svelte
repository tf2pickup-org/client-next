<script lang="ts">
  import { page } from '$app/stores';
  import { apiUrl, discordInvitationLink, koFiLink } from '$environment';
  import discord from '$lib/assets/discord-mark-white.svg';
  import kofi from '$lib/assets/kofi_s_logo_nolabel.webp';
  import logo from '$lib/assets/logo.png';
  import signInThroughSteam from '$lib/assets/signinthroughsteam.png';
  import { authenticated } from '$lib/auth/auth.store';
  import { currentPlayer } from '$lib/profile/profile.store';
  import { IconMenu2 } from '@tabler/icons-svelte';
  import { cubicInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  type PathMatcher = (path: string) => boolean;

  interface StaticLink {
    label: string;
    href: string;
    isActive: PathMatcher;
  }

  const staticLinks: StaticLink[] = [
    { label: 'Lobby', href: '/', isActive: path => path === '/' },
    { label: 'Games', href: '/games', isActive: path => path.startsWith('/games') },
    { label: 'Players', href: '/players', isActive: path => path.startsWith('/players') },
    { label: 'Rules', href: '/rules', isActive: path => path === '/rules' },
    { label: 'Stats', href: '/stats', isActive: path => path === '/stats' },
  ];

  let mobileMenuShown = false;
</script>

<nav class="flex h-[76px] min-h-[76px] bg-fogra-700 shadow shadow-black/50">
  <a href="/" class="mx-1 my-2 flex-1 self-center lg:flex-none">
    <img alt="tf2pickup.pl logo" src={logo} height="120" class="h-[60px] object-contain" />
  </a>

  <button
    class="mx-4 self-center text-white lg:hidden"
    on:click={() => (mobileMenuShown = !mobileMenuShown)}
  >
    <IconMenu2 size={48} />
  </button>

  <div
    class="ml-5 hidden grow items-center gap-2 text-lg text-white lg:flex lg:flex-row lg:flex-nowrap"
  >
    {#each staticLinks as link}
      <a
        href={link.href}
        class="border-pink-700 px-4 transition-colors hover:text-slate-300"
        class:border-b={link.isActive($page.url.pathname)}
      >
        {link.label}
      </a>
    {/each}

    <a href={discordInvitationLink} class="mx-1">
      <img alt="Join us on discord" src={discord} height="25" class="h-6" />
    </a>

    <a href={koFiLink} class="mx-1">
      <img alt="Support us on Ko-Fi!" src={kofi} height="120" class="h-16" />
    </a>

    <div class="grow" />

    {#if $authenticated === 'not authenticated'}
      <a class="mx-5" href="{apiUrl}/auth/steam">
        <img alt="Sign in through Steam" src={signInThroughSteam} />
      </a>
    {:else if $authenticated === 'authenticated' && Boolean($currentPlayer)}
      <a
        href="/player/{$currentPlayer.steamId}"
        class="mr-5 flex flex-row items-center space-x-2 transition-colors hover:text-slate-300"
      >
        <img
          src={$currentPlayer.avatar.medium}
          alt="{$currentPlayer.name}'s avatar"
          height="64"
          width="64"
          class="h-12 w-12"
        />
        <span class="text-ellipsis whitespace-nowrap font-caption text-3xl"
          >{$currentPlayer.name}</span
        >
      </a>
    {/if}
  </div>

  {#if mobileMenuShown}
    <div
      class="fixed top-0 left-0 z-50 h-full w-full bg-fogra-700/90"
      in:fade={{ duration: 100, easing: cubicInOut }}
      out:fade={{ duration: 50, easing: cubicInOut }}
    >
      <ul class="flex list-none flex-col gap-4 text-4xl text-white">
        {#each staticLinks as link}
          <li>
            <a
              href={link.href}
              class="mx-1 px-4"
              class:text-pink-700={link.isActive($page.url.pathname)}
            >
              {link.label}
            </a>
          </li>
        {/each}

        <div class="grow" />
        <div class="mx-5">
          <img alt="Sign in through Steam" src={signInThroughSteam} />
        </div>
      </ul>
    </div>
  {/if}
</nav>
