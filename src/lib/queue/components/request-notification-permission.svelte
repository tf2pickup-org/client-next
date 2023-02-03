<script lang="ts">
  import Button from '$lib/shared/components/button.svelte';
  import { IconNotification, IconCircleX } from '@tabler/icons-svelte';
  import { slide } from 'svelte/transition';

  let permission = Notification.permission;

  const requestPermission = () => {
    Notification.requestPermission().then(userPermission => (permission = userPermission));
  };
</script>

{#if permission === 'default'}
  <div class="flex flex-col bg-amber-200 md:flex-row" out:slide>
    <div class="flex grow flex-col items-center gap-2 py-2 px-4 text-lg text-black md:flex-row">
      <div class="hidden md:inline-block"><IconNotification size={24} /></div>
      <span
        >To be notified when the match is about to start, we need your permission to show browser
        notifications.</span
      >
    </div>

    <button class="self-stretch" on:click={requestPermission}>
      <Button alternateColor="rgb(10 26 51)" className="h-full">Allow notifications</Button>
    </button>
  </div>
{:else if permission === 'denied'}
  <div
    class="flex flex-col items-center gap-2 bg-rose-700 py-2 px-4 text-lg text-white md:flex-row"
  >
    <div class="hidden md:inline-block"><IconCircleX size={24} /></div>
    <span
      >You have disabled browser notifications. You will not be warned when the match is about to
      start.</span
    >
  </div>
{/if}
