<script lang="ts">
  import type { GameLaunchTimeSpan } from '$lib/statistics/types/game-launch-time-span';
  import { onMount } from 'svelte';
  import Chart, { type ChartData, type ScriptableContext } from 'chart.js/auto';

  export let data: GameLaunchTimeSpan[];

  let canvas: HTMLCanvasElement;

  const toChartData = (data: GameLaunchTimeSpan[]): ChartData<'bar'> => {
    const data2 = data
      .map(d => ({
        ...d,
        /* From 1..7 to 0..6, where 0 is Monday and 6 is Sunday */
        dayOfWeek: (d.dayOfWeek + 5) % 7,
      }))
      .sort((a, b) => a.dayOfWeek - b.dayOfWeek);
    console.log(data2);
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'morning',
          data: data2.filter(d => d.timeOfTheDay === 'morning').map(e => e.count),
          backgroundColor: '#FAFF00',
        },
        {
          label: 'afternoon',
          data: data2.filter(d => d.timeOfTheDay === 'afternoon').map(e => e.count),
          backgroundColor: '#A17BCC',
        },
        {
          label: 'evening',
          data: data2.filter(d => d.timeOfTheDay === 'evening').map(e => e.count),
          backgroundColor: '#FFCAE9',
        },
        {
          label: 'night',
          data: data2.filter(d => d.timeOfTheDay === 'night').map(e => e.count),
          backgroundColor: '#F61059',
        },
      ],
    };
  };

  onMount(() => {
    new Chart(canvas, {
      type: 'bar',
      data: toChartData(data),
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            // stacked: true,
            ticks: {
              color: '#C7C4C7',
            },
            border: {
              color: '#D9D9D9',
            },
          },
          x: {
            border: {
              color: '#D9D9D9',
            },
            grid: {
              color: 'rgba(217, 217, 217, 0.2)',
            },
            ticks: {
              color: '#C7C4C7',
            },
          },
        },
      },
    });
  });
</script>

<canvas bind:this={canvas} />
