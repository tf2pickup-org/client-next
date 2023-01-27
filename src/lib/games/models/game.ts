import type { GameServer } from './game-server';
import type { GameSlot } from './game-slot';
import type { GameState } from './game-state';
import type { Tf2Team } from './tf2-team';

export interface Game {
  id: string;
  launchedAt: Date;
  number: number;
  slots: GameSlot[];
  map: string;
  logsUrl?: string;
  demoUrl?: string;
  state: GameState;
  mumbleUrl?: string;
  error?: string;
  gameServer?: GameServer;
  stvConnectString?: string;
  score?: Record<Tf2Team, number>;
  connectInfoVersion?: number;
}
