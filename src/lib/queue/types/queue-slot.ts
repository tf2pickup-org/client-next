import type { Player } from '$lib/players/types/player';
import type { Tf2ClassName } from '$lib/shared/tf2-class-name';

export interface QueueSlot {
  id: number;
  gameClass: Tf2ClassName;
  ready: boolean;
  player?: Player;
  canMakeFriendsWith?: Tf2ClassName[];
}
