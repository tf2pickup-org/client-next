import { apiUrl } from '$environment';
import type { Queue } from '$lib/queue/types/queue';
import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {
  const res = await fetch(`${apiUrl}/queue`);
  if (res.ok) {
    return {
      queue: (await res.json()) as Queue,
    };
  } else {
    throw error(res.status);
  }
}) satisfies LayoutLoad;
