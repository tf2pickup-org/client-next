import { ioConnected } from './io/io.store';
import { isBanned, isLoggedIn } from './profile/profile.store';
import { derived } from 'svelte/store';

export const canJoinQueue = derived(
  [isLoggedIn, ioConnected, isBanned],
  ([$isLoggedIn, $ioConnected, $isBanned]) => $isLoggedIn && $ioConnected && !$isBanned,
);
