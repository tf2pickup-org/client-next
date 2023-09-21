import { PUBLIC_WEBSITE_NAME } from '$env/static/public';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
  const { queue } = await parent();
  const requiredPlayerCount = queue.slots.length;
  const currentPlayerCount = queue.slots.filter(slot => Boolean(slot.player)).length;
  return {
    metaTags: {
      title: `[${currentPlayerCount}/${requiredPlayerCount}]`,
      titleTemplate: `%s ${PUBLIC_WEBSITE_NAME}`,
    },
  };
}) satisfies PageLoad;
