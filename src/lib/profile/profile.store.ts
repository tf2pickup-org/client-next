import type { Profile } from './types/profile';
import { derived, writable } from 'svelte/store';

export const profile = writable<Profile>();

export const isLoggedIn = derived(profile, $profile => Boolean($profile));

export const currentPlayer = derived(profile, $profile => $profile?.player);
export const activeBans = derived(profile, $profile => $profile?.bans);
export const isBanned = derived(activeBans, $activeBans => $activeBans?.length > 0);
export const mapVote = derived(profile, $profile => $profile?.mapVote);
