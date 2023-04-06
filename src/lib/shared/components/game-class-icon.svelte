<script lang="ts">
  import type { Tf2ClassName } from '../tf2-class-name';
  export let gameClass: Tf2ClassName;
  export let size: number = 64;
</script>

<img
  src="/src/lib/assets/game-class-icons/{gameClass}-64x64.png"
  srcset="/src/lib/assets/game-class-icons/{gameClass}-32x32.png, /src/lib/assets/game-class-icons/{gameClass}-64x64.png 2x"
  alt={gameClass}
  width="32"
  height="32"
  class="inline-block"
  style="width: {size}px; height: {size}px;"
/>
