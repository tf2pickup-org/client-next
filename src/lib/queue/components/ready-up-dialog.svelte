<script lang="ts">
  import Overlay from '$lib/shared/components/overlay.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>

<Overlay>
  <div
    class="flex w-[616px] flex-col items-center gap-11 rounded-xl bg-abru-dark-29 px-[59px] py-[42px] shadow-xl"
  >
    <div class="flex flex-col items-center text-[32px] font-bold text-abru-light-75">
      <span>Game is starting!</span>
      <span>Are you ready to play?</span>
    </div>

    <div class="flex flex-col gap-4">
      <button
        class="w-[242px] rounded bg-accent-600 py-[12px] text-xl font-bold uppercase text-gray-50"
        on:click={() => dispatch('readyUp')}>I'm ready</button
      >
      <button
        class="w-[242px] rounded bg-abru-light-5 py-[12px] text-xl font-bold text-gray-50"
        on:click={() => dispatch('leaveQueue')}>Can't play right now</button
      >
    </div>
  </div>
</Overlay>
