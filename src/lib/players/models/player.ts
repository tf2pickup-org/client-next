import type { Link } from '$lib/shared/models/link';
import type { PlayerAvatar } from './player-avatar';
import type { PlayerRole } from './player-role';
import type { PlayerStats } from './player-stats';

export interface Player {
  id: string;
  name: string;
  joinedAt: Date;
  steamId: string;
  avatar: PlayerAvatar;
  roles: PlayerRole[];
  etf2lProfileId?: number;
  gamesPlayed: number;

  skill?: Record<string, number>;
  stats?: PlayerStats;

  _links: Link[];
}
