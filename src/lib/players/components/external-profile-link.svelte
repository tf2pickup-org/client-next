<script lang="ts">
  export let href: string;
  export let title: string;
  export let icons: [string, string];
</script>

<a
  {href}
  target="_blank"
  rel="noreferrer"
  class="flex h-[80px] w-[80px] items-center justify-center bg-white transition-colors hover:bg-slate-100"
>
  <img srcset="{icons[0]}, {icons[1]} 2x" src={icons[1]} alt="{title} icon" />
</a>
