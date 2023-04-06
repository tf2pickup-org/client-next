<script lang="ts">
  export let href: string;
</script>

<a {href} class="text-abru-100 flex flex-row flex-nowrap items-center gap-1 hover:text-slate-200">
  <slot />
</a>
