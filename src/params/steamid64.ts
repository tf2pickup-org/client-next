import type { ParamMatcher } from '@sveltejs/kit';

export const match = (param => {
  return /^\d{17}$/.test(param);
}) satisfies ParamMatcher;
