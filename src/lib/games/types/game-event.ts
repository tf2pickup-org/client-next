import type { GameEventType } from './game-event-type';

export interface GameEvent {
  event: GameEventType;
  at: Date;
  [key: string]: unknown;
}
