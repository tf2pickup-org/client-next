import { PUBLIC_API_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
  throw redirect(302, `${PUBLIC_API_URL}/auth/sign-out`);
}) satisfies PageServerLoad;
