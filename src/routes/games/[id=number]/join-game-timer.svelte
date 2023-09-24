<script lang="ts">
  import { intervalToDuration, isAfter } from 'date-fns';
  import { onDestroy, onMount } from 'svelte';

  export let timeout: Date;

  let timeoutText: string;

  const updateTimeoutText = () => {
    if (isAfter(timeout, new Date())) {
      const duration = intervalToDuration({ start: timeout, end: new Date() });
      timeoutText = [
        duration.minutes,
        duration.seconds?.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
        }),
      ].join(':');
    } else {
      timeoutText = '0:00';
    }
  };

  const interval = setInterval(updateTimeoutText, 1000);

  onMount(() => updateTimeoutText());
  onDestroy(() => clearInterval(interval));
</script>

<div class="flex flex-col">
  <span class="text-2xl font-medium">{timeoutText}</span>
  <div class="bg-abru-light-5 h-1 flex-1 rounded-full">
    <div class="bg-abru-light-75 h-1 rounded-full" style="width: 75%" />
  </div>
</div>
