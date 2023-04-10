<script lang="ts">
  let permission = typeof window === 'undefined' ? null : Notification.permission;

  const requestPermission = () => {
    Notification.requestPermission().then(userPermission => (permission = userPermission));
  };
</script>

{#if permission === 'default'}
  <div
    class="bg-alert text-abru-dark-3 flex flex-col items-center rounded-lg px-3 py-2 md:flex-row"
  >
    <span class="flex-1 text-lg font-medium"
      >To be notified when a game is about to start, we need your permission to show browser
      notifications.</span
    >
    <button class="allow-notifications-button" on:click={requestPermission}
      >Allow notifications</button
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

<style lang="postcss">
  .allow-notifications-button {
    @apply transition-colors;
    @apply duration-75;

    background-color: theme('colors.abru.DEFAULT');
    color: theme('colors.alert');
    border-radius: 4px;
    padding: 5px 28px;
    font-size: 16px;
    line-height: 22px;
    font-weight: 700;
    text-transform: uppercase;

    &:hover {
      background-color: lighten(theme('colors.abru.DEFAULT'), 4%);
    }
  }
</style>
