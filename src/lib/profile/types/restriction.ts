import type { Tf2ClassName } from '$lib/shared/tf2-class-name';

export interface Restriction {
  reason: 'account needs review' | 'player skill is below the threshold';
  gameClasses?: Tf2ClassName[];
}
