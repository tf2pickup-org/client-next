<script lang="ts">
  import type { GameLaunchesPerDay } from '$lib/statistics/types/game-launches-per-day';
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { sub } from 'date-fns';

  export let data: GameLaunchesPerDay[];

  let canvas: HTMLCanvasElement;

  const toChartData = (data: GameLaunchesPerDay[]) => {
    const date = sub(Date.now(), { months: 1 });
    const end = new Date();
    const ordered: GameLaunchesPerDay[] = [];

    while (date < end) {
      const day = date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });

      const monthNumeric = `0${date.getMonth() + 1}`.slice(-2);
      const dateNumeric = `0${date.getDate()}`.slice(-2);
      const lookupDay = `${date.getFullYear()}-${monthNumeric}-${dateNumeric}`;

      ordered.push({
        day,
        count: data.find(d => d.day === lookupDay)?.count ?? 0,
      });

      date.setDate(date.getDate() + 1);
    }

    return {
      labels: ordered.map(d => d.day),
      datasets: [
        {
          data: ordered.map(d => d.count),
          fill: false,
          borderWidth: 1,
          borderColor: '#F61059',
          pointBackgroundColor: '#F61059',
          spanGaps: true,
          // pointRadius: 2,
        },
      ],
    };
  };

  onMount(() => {
    new Chart(canvas, {
      type: 'line',
      data: toChartData(data),
      options: {
        spanGaps: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
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
          y: {
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
