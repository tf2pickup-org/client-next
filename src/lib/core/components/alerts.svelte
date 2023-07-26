<script>
  import Bans from './bans.svelte';
  import Offline from './offline.svelte';
  import RequestNotificationPermissions from './request-notification-permissions.svelte';
</script>

<div class="flex flex-col gap-3">
  <Offline />
  <Bans />
  <RequestNotificationPermissions />
</div>
