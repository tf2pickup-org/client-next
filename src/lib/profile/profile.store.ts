import type { Profile } from './types/profile';
import { derived, writable } from 'svelte/store';

export const profile = writable<Profile>();

export const isLoggedIn = derived(profile, $profile => Boolean($profile));
