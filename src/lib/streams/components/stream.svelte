<script lang="ts">
  import { IconEye } from '@tabler/icons-svelte';

  export let userName: string;
  export let viewerCount: number;
  export let thumbnailUrl: string;

  let thumbnail: string;

  $: thumbnail = thumbnailUrl.replace('{width}', '177').replace('{height}', '100');
</script>

<a
  class="stream-link flex flex-row gap-6 rounded-lg p-2.5"
  href={'https://www.twitch.tv/' + userName}
  target="_blank"
  rel="noreferrer"
>
  <img src={thumbnail} alt="stream thumbnail" class="rounded-sm" width="177" height="100" />
  <div class="flex flex-col justify-center font-medium text-abru-light-75">
    <span class="text-lg">{userName}</span>
    <span class="flex flex-row items-end gap-1.5 text-sm">
      <IconEye size={18} />
      {viewerCount}
    </span>
  </div>
</a>

<style lang="postcss">
  .stream-link {
    @apply transition-colors;
    @apply duration-75;

    background-color: theme('colors.abru.light.15');

    &:hover {
      background-color: lighten(theme('colors.abru.light.15'), 4%);
    }
  }
</style>
