import type { PageLoad } from './$types';

export const load = (() => {
  return {
    metaTags: {
      title: 'hall of fame',
    },
  };
}) satisfies PageLoad;
