import { goto } from '$app/navigation';
import { apiUrl } from '$environment';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { writable, type Unsubscriber } from 'svelte/store';

type AuthenticatedState = 'unknown' | 'authenticated' | 'not authenticated';

export const authenticated = writable<AuthenticatedState>('unknown');
export const authToken = new BehaviorSubject<string | undefined>(undefined);

const discoverAuthentication = () => {
  const params = new URLSearchParams(window.location.search);

  if (params.has('refresh_token')) {
    const refreshToken = params.get('refresh_token')!;

    try {
      const decoded = jwtDecode(refreshToken) as { exp: number };
      if (Date.now() >= decoded.exp * 1000) {
        localStorage.removeItem('refresh_token');
        authenticated.set('not authenticated');
      } else {
        localStorage.setItem('refresh_token', refreshToken);
        authenticated.set('authenticated');
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem('refresh_token');
      authenticated.set('not authenticated');
    }
  } else {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken === null) {
      authenticated.set('not authenticated');
      return;
    }

    try {
      const decoded = jwtDecode(refreshToken) as { exp: number };
      if (Date.now() >= decoded.exp * 1000) {
        localStorage.removeItem('refresh_token');
        authenticated.set('not authenticated');
      } else {
        authenticated.set('authenticated');
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem('refresh_token');
      authenticated.set('not authenticated');
    }
  }

  if (params.has('auth_token')) {
    const token = params.get('auth_token')!;
    authToken.next(token);
  }

  history.pushState('', document.title, window.location.pathname);
};

export const updateTokens = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    const res = await fetch(`${apiUrl}/auth?refresh_token=${refreshToken}`, {
      method: 'POST',
      body: '{}',
    });
    if (res.ok) {
      const { refreshToken, authToken: newAuthToken } = await res.json();
      localStorage.setItem('refresh_token', refreshToken);
      authToken.next(newAuthToken);
    } else {
      goto(`${apiUrl}/auth/steam`);
    }
  }
};

export const waitUntilAuthenticationDiscovered = async () => {
  let unsubscribe: Unsubscriber;
  return new Promise<void>(resolve => {
    unsubscribe = authenticated.subscribe(value => {
      if (['authenticated', 'not authenticated'].includes(value)) {
        resolve();
      }
    });
  }).then(() => unsubscribe());
};

discoverAuthentication();
