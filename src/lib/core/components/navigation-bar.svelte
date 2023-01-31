<script lang="ts">
  import { page } from '$app/stores';
  import logo from '$lib/assets/logo.png';
  import signInThroughSteam from '$lib/assets/signinthroughsteam.png';

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
</script>

<nav
  class="flex h-[76px] min-h-[76px] justify-center bg-primary shadow shadow-black/50 lg:justify-start"
>
  <a href="/" class="mx-1 self-center">
    <img alt="tf2pickup.pl logo" src={logo} class="h-[60px]" />
  </a>

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
</nav>
