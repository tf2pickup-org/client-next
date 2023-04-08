import { apiUrl } from '$environment';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
  throw redirect(302, `${apiUrl}/auth/sign-out`);
}) satisfies PageServerLoad;
