<script lang="ts">
  export let href: string;
</script>

<a
  {href}
  class="text-abru-100 hover:bg-abru-dark-800/40 flex flex-row flex-nowrap items-center gap-1 rounded px-2.5 py-1 transition-colors duration-75"
>
  <slot />
</a>
