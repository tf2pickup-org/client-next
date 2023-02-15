import { authenticated } from './auth/auth.store';
import { ioConnected } from './io/io.store';
import { isBanned } from './profile/profile.store';
import { derived } from 'svelte/store';

export const canJoinQueue = derived(
  [authenticated, ioConnected, isBanned],
  ([$authenticated, $ioConnected, $isBanned]) =>
    $authenticated === 'authenticated' && $ioConnected && !$isBanned,
);
