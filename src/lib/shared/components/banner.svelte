<script context="module" lang="ts">
  export enum BannerRole {
    alert,
    warning,
  }
</script>

<script lang="ts">
  export let role: BannerRole;

  const variants = {
    [BannerRole.alert]: 'bg-alert text-abru-dark-3',
    [BannerRole.warning]: 'bg-accent-600 text-abru-dark-3',
  };

  let classes: string;

  $: classes = variants[role];
</script>

<div
  class="text-abru-dark-3 flex flex-col items-center rounded-lg px-3 py-2 text-lg font-medium md:flex-row {classes}"
>
  <slot />
</div>
