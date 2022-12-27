<script lang="ts">
  import type { Tf2ClassName } from '../models/tf2-class-name';

  export let gameClass: Tf2ClassName;
  export let size: number = 64;
</script>

<img
  src="/src/lib/assets/game-class-icons/{gameClass}-64x64.png"
  srcset="/src/lib/assets/game-class-icons/{gameClass}-32x32.png, /src/lib/assets/game-class-icons/{gameClass}-64x64.png 2x"
  alt={gameClass}
  width={size}
  height={size}
  class="inline-block"
/>
