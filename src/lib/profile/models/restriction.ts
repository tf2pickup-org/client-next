import type { Tf2ClassName } from '$lib/shared/models/tf2-class-name';

export interface Restriction {
  reason: 'account needs review';
  gameClasses?: Tf2ClassName[];
}
