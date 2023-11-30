import type { GameEventType } from './game-event-type';

export interface GameEvent {
  event: GameEventType;
  at: string;
  [key: string]: unknown;
}
