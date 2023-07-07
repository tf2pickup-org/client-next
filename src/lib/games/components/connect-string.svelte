<script lang="ts">
  import { IconCopy } from '@tabler/icons-svelte';

  export let connectString: string;
</script>

<div
  class="border-abru-light-25 bg-abru-light-5 text-abru-light-75 flex flex-row gap-4 rounded border px-3 py-[10px] text-base font-medium"
>
  <input
    type="text"
    class="bg-abru-light-5 text-abru-light-75 fade block flex-1 text-base focus:outline-none"
    value={connectString}
    readonly
  />

  <button>
    <IconCopy size={24} />
  </button>
</div>

<style lang="postcss">
  .fade {
    mask-image: linear-gradient(90deg, #000 80%, transparent);
  }
</style>
