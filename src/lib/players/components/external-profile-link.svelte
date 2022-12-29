<script lang="ts">
  export let href: string;
  export let title: string;
  export let icons: [string, string];
</script>

<a
  {href}
  target="_blank"
  rel="noreferrer"
  class="flex items-center justify-center transition-colors bg-white hover:bg-slate-100 w-[80px] h-[80px] rounded-2xl"
>
  <img srcset="{icons[0]}, {icons[1]} 2x" src={icons[1]} alt="{title} icon" />
</a>
