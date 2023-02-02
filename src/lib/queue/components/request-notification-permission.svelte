<script lang="ts">
  import Button from '$lib/shared/components/button.svelte';
  import { IconNotification } from '@tabler/icons-svelte';

  let permission = Notification.permission;
</script>

{#if permission === 'default'}
  <div class="flex flex-col bg-amber-200 md:flex-row">
    <div class="flex grow flex-col items-center gap-2 py-2 px-4 text-lg text-black md:flex-row">
      <div class="hidden md:inline-block"><IconNotification size={24} /></div>
      <span
        >To be notified when the match is about to start, we need your permission to show browser
        notifications.</span
      >
    </div>

    <button class="self-stretch">
      <Button alternateColor="rgb(10 26 51)" className="h-full">Allow notifications</Button>
    </button>
  </div>
{/if}
