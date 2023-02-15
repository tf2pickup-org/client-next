import {
  authenticated,
  authToken,
  updateTokens,
  waitUntilAuthenticationDiscovered,
} from './auth.store';
import { get } from 'svelte/store';

export const authorizedFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> => {
  await waitUntilAuthenticationDiscovered();

  const authState = get(authenticated);

  if (authState === 'authenticated') {
    const res = await fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${authToken.value}`,
      },
    });
    if (!res.ok && res.status === 401) {
      await updateTokens();
      return await fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          Authorization: `Bearer ${authToken.value}`,
        },
      });
    } else {
      return res;
    }
  } else {
    return await fetch(input, init);
  }
};
