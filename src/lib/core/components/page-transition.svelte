<script lang="ts">
  import { linear } from 'svelte/easing';
  import type { TransitionConfig } from 'svelte/transition';

  // an implementation of svelte's fade but with position: absolute set prior to the delay param
  const fade = (
    node: Element,
    { delay = 0, duration = 400, easing = linear },
  ): TransitionConfig => {
    const o = +getComputedStyle(node).opacity;
    const position = getComputedStyle(node).position;

    const before = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `;

    const after = `position: ${position};`;

    return {
      delay,
      duration,
      easing,
      css: t => `
        ${t < delay ? before : after}
        opacity: ${t * o};
      `,
    };
  };
</script>

<div in:fade={{ duration: 100, delay: 70 }} out:fade={{ duration: 50 }}>
  <slot />
</div>
