import type { Player } from '$lib/players/types/player';
import type { Tf2ClassName } from '$lib/shared/tf2-class-name';
import type { PlayerConnectionStatus } from './player-connection-status';
import type { SlotStatus } from './slot-status';
import type { Tf2Team } from './tf2-team';

export interface GameSlot {
  player: Player;
  team: Tf2Team;
  gameClass: Tf2ClassName;
  connectionStatus: PlayerConnectionStatus;
  status: SlotStatus;
}
