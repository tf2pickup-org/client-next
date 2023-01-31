<footer
  class="flex flex-row items-center justify-center bg-white p-2 text-sm shadow shadow-black/50"
>
  <span class="footer-entry">© 2019-2023 tf2pickup.org</span>
  <span class="footer-entry">
    <a href="https://github.com/tf2pickup-org" target="_blank" rel="noreferrer">github</a>
  </span>
  <span class="footer-entry">
    <a href="https://discord.gg/UVFVfc4" target="_blank" rel="noreferrer">discord</a>
  </span>
</footer>

<style lang="scss">
  .footer-entry {
    &:not(:first-child)::before {
      content: '•';
      margin: 0 0.2rem;
    }
  }
</style>
