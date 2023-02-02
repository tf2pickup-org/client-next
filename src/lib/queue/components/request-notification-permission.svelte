<script lang="ts">
  import Button from '$lib/shared/components/button.svelte';
  import MessageAlert from 'svelte-material-icons/MessageAlert.svelte';

  let permission = Notification.permission;
</script>

{#if permission === 'default'}
  <div class="flex flex-row bg-amber-200">
    <div class="flex grow flex-row items-center gap-2 py-2 px-4 text-lg text-black">
      <MessageAlert size={24} /> To be notified when the match is about to start, we need your permission
      to show browser notifications.
    </div>

    <button class="self-stretch">
      <Button alternateColor="rgb(10 26 51)" className="h-full">Allow notifications</Button>
    </button>
  </div>
{/if}
