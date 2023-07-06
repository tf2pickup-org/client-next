<script>
  import Overlay from '$lib/shared/components/overlay.svelte';
  import { leaveQueue } from '../api/leave-queue';
  import { readyUp } from '../api/ready-up';
</script>

<Overlay>
  <div
    class="bg-abru-dark-29 flex w-[616px] flex-col items-center gap-11 rounded-xl px-[59px] py-[42px] shadow-xl"
  >
    <div class="text-abru-light-75 flex flex-col items-center text-[32px] font-bold">
      <span>Game is starting!</span>
      <span>Are you ready to play?</span>
    </div>

    <div class="flex flex-col gap-4">
      <button
        class="bg-accent-600 w-[242px] rounded py-[12px] text-xl font-bold uppercase text-gray-50"
        on:click={readyUp}>I'm ready</button
      >
      <button
        class="bg-abru-light-5 w-[242px] rounded py-[12px] text-xl font-bold text-gray-50"
        on:click={leaveQueue}>Can't play right now</button
      >
    </div>
  </div>
</Overlay>
