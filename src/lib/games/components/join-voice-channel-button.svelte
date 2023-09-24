<script lang="ts">
  export let voiceChannelUrl: string | undefined;
</script>

<a href={voiceChannelUrl} class="button text-[18px]">
  <slot />
</a>
