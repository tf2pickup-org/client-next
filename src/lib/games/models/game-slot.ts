import type { PlayerConnectionStatus } from './player-connection-status';
import type { Tf2Team } from './tf2-team';
import type { SlotStatus } from './slot-status';
import type { Player } from '$lib/players/models/player';
import type { Tf2ClassName } from '$lib/shared/models/tf2-class-name';

export interface GameSlot {
  player: Player;
  team: Tf2Team;
  gameClass: Tf2ClassName;
  connectionStatus: PlayerConnectionStatus;
  status: SlotStatus;
}
