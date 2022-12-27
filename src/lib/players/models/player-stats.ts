import type { Tf2ClassName } from "$lib/shared/models/tf2-class-name";

export interface PlayerStats {
  player: string;
  gamesPlayed: number;
  classesPlayed: Record<Tf2ClassName, number>;
}
