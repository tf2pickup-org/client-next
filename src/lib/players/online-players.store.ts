import type { Player } from './types/player';
import { derived, writable } from 'svelte/store';

export const onlinePlayers = writable<Map<string, Player>>(new Map());
export const onlinePlayersSorted = derived(onlinePlayers, $onlinePlayers =>
  Array.from($onlinePlayers.values()).sort((a, b) => a.name.localeCompare(b.name)),
);
