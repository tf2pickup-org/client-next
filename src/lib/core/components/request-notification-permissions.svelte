<script lang="ts">
  let permission = typeof window === 'undefined' ? null : Notification.permission;

  const requestPermission = () => {
    Notification.requestPermission().then(userPermission => (permission = userPermission));
  };
</script>

{#if permission === 'default'}
  <div class="bg-alert text-abru-dark-3 flex flex-row items-center rounded-lg px-3 py-2">
    <span class="flex-1 text-lg font-medium"
      >To be notified when a game is about to start, we need your permission to show browser
      notifications.</span
    >
    <button
      class="bg-abru text-alert hover:bg-abru-light-10 rounded px-7 py-[5px] text-base font-bold uppercase"
      on:click={requestPermission}>Allow notifications</button
    >
  </div>
{:else if permission === 'denied'}
  <div class="bg-accent-600 text-abru-dark-3 rounded px-3 py-2 text-lg font-medium">
    <span
      >You have disabled browser notifications. You will not be warned when a game is about to
      start.</span
    >
  </div>
{/if}
