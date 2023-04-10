import { readable, writable } from 'svelte/store';

export const isPreReadied = writable<boolean>(false);

export const preReadyTimeout = readable<number>(0, set => {
  let value = 0;
  let interval: ReturnType<typeof setInterval> | undefined;

  isPreReadied.subscribe($isPreReadied => {
    if ($isPreReadied) {
      value = 3 * 60; // 5 minutes
      set(value);

      interval = setInterval(() => {
        value -= 1;
        set(value);

        if (value === 0) {
          isPreReadied.set(false);
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
      interval = undefined;
    }
  });

  return () => clearInterval(interval);
});
