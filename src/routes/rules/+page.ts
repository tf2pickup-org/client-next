import { fetchDocument } from '$lib/documents/api/fetch-document';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
  return await fetchDocument('rules', fetch);
}) satisfies PageLoad;
