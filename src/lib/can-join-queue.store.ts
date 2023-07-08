import { ioConnected } from './io/io.store';
import { activeGameId, isBanned, isLoggedIn } from './profile/profile.store';
import { derived } from 'svelte/store';

export const canJoinQueue = derived(
  [isLoggedIn, ioConnected, isBanned, activeGameId],
  ([$isLoggedIn, $ioConnected, $isBanned, $activeGameId]) =>
    $isLoggedIn && $ioConnected && !$isBanned && !$activeGameId,
);
