<script lang="ts">
  import type { PlayedMapCount } from '$lib/statistics/types/played-map-count';
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { concat, dropRight, takeRight } from 'lodash';

  export let data: PlayedMapCount[];

  let container: HTMLCanvasElement;

  const backgroundColor = [
    '#F61059',
    '#FFCAE9',
    '#A17BCC',
    '#FAFF00',
    '#FF8C42',
    '#06D6A0',
    '#573280',
    '#51BBFE',
    '#AED4E6',
  ];

  const toChartData = (data: PlayedMapCount[]) => {
    const lastFewMaps = takeRight(data, Math.max(0, data.length - 8));
    const other: PlayedMapCount = {
      mapName: 'other',
      count: lastFewMaps.reduce((sum, d) => sum + d.count, 0),
    };
    const topMaps = concat(dropRight(data, Math.max(0, data.length - 8)), other);

    return {
      labels: topMaps.map(d => d.mapName),
      datasets: [
        {
          data: topMaps.map(d => d.count),
          backgroundColor,
          borderWidth: 2,
          borderColor: '#141115',
          hoverOffset: 4,
        },
      ],
    };
  };

  onMount(() => {
    new Chart(container, {
      type: 'pie',
      data: toChartData(data),
      options: {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 14,
              boxHeight: 14,
              font: {
                size: 14,
              },
              color: '#C7C4C7',
              padding: 16,
            },
          },
        },
      },
    });
  });
</script>

<canvas bind:this={container}></canvas>
