<script lang="ts">
  import { activeBans } from '$lib/profile/profile.store';
  import Banner, { BannerRole } from '$lib/shared/components/banner.svelte';
  import Date from '$lib/shared/components/date.svelte';
</script>

{#if $activeBans}
  {#each $activeBans as ban}
    <Banner role={BannerRole.warning}>
      <div class="flex flex-col">
        <div class="flex flex-row gap-1">
          <span class="font-normal">Ban issued by:</span>
          <span>{ban.admin}</span>
        </div>

        <div class="flex flex-row gap-1">
          <span class="font-normal">Expires:</span>
          <span><Date date={ban.end} /></span>
        </div>

        <div class="flex flex-row gap-1">
          <span class="font-normal">Reason:</span>
          <span>{ban.reason}</span>
        </div>
      </div>
    </Banner>
  {/each}
{/if}
