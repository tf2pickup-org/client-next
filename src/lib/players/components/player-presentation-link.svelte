<script lang="ts">
  export let href: string;
</script>

<a
  {href}
  target="_blank"
  rel="noreferrer"
  class="bg-abru-light-3 text-abru-light-75 hover:bg-abru-light-5 flex flex-row items-center justify-center gap-2 rounded px-[32px] py-[12px] text-lg font-bold uppercase leading-none transition-colors duration-75"
>
  <slot />
</a>
