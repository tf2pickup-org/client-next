<script lang="ts">
  import type { Player } from '$lib/players/types/player';
  import HofRecord from './hof-record.svelte';

  export let title: string;
  export let records: { count: number; player: Player }[];
</script>

<div class="board">
  <div class="title col-span-4">{title}</div>
  {#each records as record, i}
    <HofRecord
      place={i + 1}
      steamId={record.player.steamId}
      name={record.player.name}
      avatar={record.player.avatar}
      count={record.count}
    />
  {/each}
</div>

<style lang="postcss">
  .board {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    column-gap: 16px;
    row-gap: 10px;

    padding: 10px 14px;

    background-color: rgba(19, 16, 20, 0.5);
    color: theme('colors.abru.light.75');
    border-radius: 8px;

    font-size: 20px;
    font-weight: 500;

    .title {
      font-size: 24px;
      font-weight: 700;
    }
  }
</style>
