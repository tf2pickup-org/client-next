<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div class="relative w-full flex-1">
  <div
    in:fade={{ duration: 100, delay: 50 }}
    out:fade={{ duration: 50 }}
    class="absolute left-0 top-0 h-full w-full"
  >
    <slot />
  </div>
</div>
