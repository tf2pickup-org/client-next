<script lang="ts">
  interface ExternalFooterLink {
    label: string;
    href: string;
  }

  const externalLinks: ExternalFooterLink[] = [
    {
      label: 'github',
      href: 'https://github.com/tf2pickup-org',
    },
    {
      label: 'discord',
      href: 'https://discord.gg/UVFVfc4',
    },
  ];
</script>

<footer
  class="flex flex-row items-center justify-center bg-white p-2 text-sm text-slate-900 shadow shadow-black/50"
>
  <span class="footer-entry">© 2019-2023 tf2pickup.org</span>
  {#each externalLinks as link}
    <span class="footer-entry">
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        class="text-slate-900 transition-colors hover:text-slate-700">{link.label}</a
      >
    </span>
  {/each}
</footer>

<style lang="scss">
  .footer-entry {
    &:not(:first-child)::before {
      content: '•';
      margin: 0 0.2rem;
    }
  }
</style>
