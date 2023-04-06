<script lang="ts">
  import MapThumbnail from '$lib/shared/components/map-thumbnail.svelte';

  export let map: string;
  export let votePercent: number;
</script>

<button
  class="from-abru-500 aspect-3/1 relative flex flex-1 flex-col items-start overflow-hidden rounded-lg bg-gradient-to-r from-35% to-transparent to-90% p-3 text-white"
  disabled
>
  <div class="grow" />
  <span class="text-2xl font-bold leading-4">{votePercent}%</span>
  <span class="text-2xl font-normal">
    {map}
  </span>

  <div class="absolute bottom-0 left-0 right-0 top-0 -z-10">
    <MapThumbnail {map} />
  </div>
</button>
