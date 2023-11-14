<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PlayerPreferences } from '$lib/profile/types/player-preferences';
  import { IconVolume, IconVolume2, IconVolume3 } from '@tabler/icons-svelte';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  const preferences = getContext<Writable<PlayerPreferences>>('preferences');

  let soundVolume: number;
  let changed = false;
  let saving = false;

  $: soundVolume = parseFloat($preferences.soundVolume ?? '1.0');
</script>

<div class="bg-abru-dark-25 text-abru-light-75 rounded-lg p-[24px]">
  <div class="mb-3 text-2xl font-bold">Preferences</div>

  <form
    method="POST"
    action="?/save"
    use:enhance={() => {
      saving = true;

      return async ({ update }) => {
        await update({ reset: false });
        saving = false;
        changed = false;
      };
    }}
    on:change={() => (changed = true)}
  >
    <div class="mb-3 text-base">Notification sound volume</div>
    <div class="flex flex-row items-center gap-2">
      {#if soundVolume === 0}
        <IconVolume3 />
      {:else if soundVolume < 0.8}
        <IconVolume2 />
      {:else}
        <IconVolume />
      {/if}
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        aria-label="Notification sound volume"
        class="w-[360px]"
        value={soundVolume}
        on:input={e => (soundVolume = parseFloat(e.currentTarget.value))}
        name="soundVolume"
      />
    </div>

    <button type="submit" class="button button--accent mt-10" disabled={!changed || saving}
      >Save changes</button
    >
  </form>
</div>
