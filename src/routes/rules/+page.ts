import type { PageLoad } from './$types';

export const load = (() => {
  return {
    metaTags: {
      title: 'rules',
    },
  };
}) satisfies PageLoad;
