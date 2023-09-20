import type { PageLoad } from './$types';

export const load = (() => {
  return {
    metaTags: {
      title: 'privacy policy',
    },
  };
}) satisfies PageLoad;
