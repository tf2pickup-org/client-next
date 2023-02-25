import { fetchProfile } from './api/fetch-profile';
import { profileUpdated } from './events';
import type { Profile } from './models/profile';
import type { Subscription } from 'rxjs';
import { derived, writable } from 'svelte/store';

export const profile = writable<Profile>(undefined, set => {
  let value: Profile;
  let subscription: Subscription;

  const updateProfile = (profileUpdate: Partial<Profile>) => {
    value = { ...value, ...profileUpdate };
    set(value);
  };

  const loadProfile = async () => {
    value = await fetchProfile();
    subscription = profileUpdated.subscribe(updateProfile);
    set(value);
  };

  loadProfile();
  return () => subscription?.unsubscribe();
});

export const currentPlayer = derived(profile, $profile => $profile?.player);
export const activeBans = derived(profile, $profile => $profile?.bans);
export const isBanned = derived(activeBans, $activeBans => $activeBans?.length > 0);
export const mapVote = derived(profile, $profile => $profile?.mapVote);
