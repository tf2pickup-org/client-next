import type { ParamMatcher } from '@sveltejs/kit';

export const match = (param => {
  return /^[a-f\d]{24}$/.test(param);
}) satisfies ParamMatcher;
