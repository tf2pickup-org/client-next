import type { Link } from '$lib/shared/types/link';
import type { PlayerAvatar } from './player-avatar';
import type { PlayerRole } from './player-role';

export interface Player {
  id: string;
  name: string;
  joinedAt: Date;
  steamId: string;
  avatar: PlayerAvatar;
  roles: PlayerRole[];
  etf2lProfileId?: number;
  gamesPlayed: number;

  _links: Link[];
}
