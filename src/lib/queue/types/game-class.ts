import type { Tf2ClassName } from '$lib/shared/tf2-class-name';

export interface GameClass {
  name: Tf2ClassName;
  count: number;
  canMakeFriendsWith?: Tf2ClassName[];
}
