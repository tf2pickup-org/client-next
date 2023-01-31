<script lang="ts">
  export let href: string;
</script>

<a
  {href}
  target="_blank"
  rel="noreferrer"
  class="flex h-[80px] w-[80px] items-center justify-center bg-white transition-colors hover:bg-slate-100"
>
  <slot />
</a>
