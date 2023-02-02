<script lang="ts">
  import { page } from '$app/stores';
  import logo from '$lib/assets/logo.png';
  import signInThroughSteam from '$lib/assets/signinthroughsteam.png';
  import Menu from 'svelte-material-icons/Menu.svelte';
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

<nav class="flex h-[76px] min-h-[76px] bg-primary shadow shadow-black/50">
  <a href="/" class="mx-1 my-2 flex-1 self-center lg:flex-none">
    <img alt="tf2pickup.pl logo" src={logo} height="120" class="h-[60px] object-contain" />
  </a>

  <button
    class="mx-4 self-center text-white lg:hidden"
    on:click={() => (mobileMenuShown = !mobileMenuShown)}
  >
    <Menu size="48" />
  </button>

  <div class="ml-5 hidden grow items-center text-lg text-white lg:flex lg:flex-row lg:flex-nowrap">
    {#each staticLinks as link}
      <a
        href={link.href}
        class="mx-1 border-pink-700 px-4"
        class:border-b={link.isActive($page.url.pathname)}
      >
        {link.label}
      </a>
    {/each}

    <div class="grow" />

    <div class="mx-5">
      <img alt="Sign in through Steam" src={signInThroughSteam} />
    </div>
  </div>

  {#if mobileMenuShown}
    <div
      class="fixed top-0 left-0 z-50 h-full w-full bg-primary/90"
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

        <div class="grow"></div>
        <div class="mx-5">
          <img alt="Sign in through Steam" src={signInThroughSteam} />
        </div>
      </ul>
    </div>
  {/if}
</nav>
