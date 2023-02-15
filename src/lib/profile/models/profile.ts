import type { LinkedProfile } from '$lib/players/models/linked-profile';
import type { Player } from '$lib/players/models/player';
import type { PlayerBan } from '$lib/players/models/player-ban';
import type { Restriction } from './restriction';

export interface Profile {
  player: Player;

  activeGameId: string | null;
  bans: PlayerBan[];
  mapVote?: string;

  preferences: {
    [key: string]: string;
  };

  hasAcceptedRules: boolean;

  linkedProfiles?: LinkedProfile[];

  restrictions?: Restriction[];
}
