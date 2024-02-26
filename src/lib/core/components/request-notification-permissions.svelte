<script lang="ts">
  import Banner, { BannerRole } from '$lib/shared/components/banner.svelte';

  let permission = typeof window === 'undefined' ? null : Notification.permission;

  const requestPermission = () => {
    Notification.requestPermission().then(userPermission => (permission = userPermission));
  };
</script>

{#if permission === 'default'}
  <Banner role={BannerRole.alert}>
    <span class="flex-1 text-center sm:text-start"
      >To be notified when a game is about to start, we need your permission to show browser
      notifications.</span
    >
    <button class="allow-notifications-button" on:click={requestPermission}
      >Allow notifications</button
    >
  </Banner>
{:else if permission === 'denied'}
  <Banner role={BannerRole.warning}>
    You have disabled browser notifications. You will not be warned when a game is about to start.
  </Banner>
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
