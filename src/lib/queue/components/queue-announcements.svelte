<script lang="ts">
  import { ioConnected } from '$lib/io/io.store';
  import { activeBans } from '$lib/profile/profile.store';
  import { IconAlertTriangle, IconBan } from '@tabler/icons-svelte';
  import { intlFormat } from 'date-fns';
</script>

{#if $ioConnected === false}
  <div class="flex flex-row items-center gap-2 bg-amaranth-600 py-2 px-4 font-semibold text-white">
    <IconAlertTriangle size={24} />You are disconnected from the server.
  </div>
{/if}

{#if $activeBans && $activeBans.length > 0}
  {#each $activeBans as ban}
    <div class="flex flex-row items-center gap-4 bg-amaranth-600 py-2 px-4 text-white">
      <IconBan size={48} stroke={2} />
      <div class="flex flex-col">
        <span class="font-semibold">You are banned.</span>
        <div>
          <span class="text-slate-100">Expires:</span>
          <span class="font-semibold">{intlFormat(new Date(ban.end))}</span>
        </div>
        <div>
          <span class="text-slate-100">Reason:</span>
          <span class="font-semibold">{ban.reason}</span>
        </div>
      </div>
    </div>
  {/each}
{/if}
