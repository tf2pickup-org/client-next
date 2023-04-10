<script lang="ts">
  import type { TwitchTvStream } from '../types/twitch-tv-stream';
  import { IconEye } from '@tabler/icons-svelte';

  export let stream: TwitchTvStream;

  let thumbnailUrl: string;

  $: thumbnailUrl = stream.thumbnailUrl.replace('{width}', '177').replace('{height}', '100');
</script>

<a
  class="stream-link flex flex-row gap-6 rounded-lg p-2.5"
  href={'https://www.twitch.tv/' + stream.userName}
  target="_blank"
  rel="noreferrer"
>
  <img src={thumbnailUrl} alt="stream thumbnail" class="rounded-sm" width="177" height="100" />
  <div class="text-abru-light-75 flex flex-col justify-center font-medium">
    <span class="text-lg">{stream.userName}</span>
    <span class="flex flex-row items-end gap-1.5 text-sm">
      <IconEye size={18} />
      {stream.viewerCount}
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
