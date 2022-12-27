import type { Player } from '$lib/players/models/player';
import type { Tf2ClassName } from '$lib/shared/models/tf2-class-name';

export interface QueueSlot {
  id: number;
  gameClass: Tf2ClassName;
  ready: boolean;
  player?: Player;
  canMakeFriendsWith?: Tf2ClassName[];
}
