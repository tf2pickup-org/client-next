<script>
  import logo from '$lib/assets/logo.png';
  import signInThroughSteam from '$lib/assets/signinthroughsteam.png';
  import { page } from '$app/stores';

  const staticLinks = [
    { label: 'Lobby', href: '/' },
    { label: 'Games', href: '/games' },
    { label: 'Players', href: '/players' },
    { label: 'Rules', href: '/rules' },
    { label: 'Stats', href: '/stats' },
  ];
</script>

<nav class="flex h-[76px] justify-center bg-primary shadow shadow-black/50 lg:justify-start">
  <a href="/" class="mx-1 self-center">
    <img alt="tf2pickup.pl logo" src={logo} class="h-[60px]" />
  </a>

  <div class="ml-5 hidden grow items-center text-lg text-white lg:flex lg:flex-row lg:flex-nowrap">
    {#each staticLinks as link}
      <a
        href={link.href}
        class="mx-1 border-pink-700 px-4"
        class:border-b={$page.url.pathname === link.href}
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
