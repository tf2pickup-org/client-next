import { socket } from '$lib/io/socket';
import type { Profile } from './types/profile';
import { fromEvent } from 'rxjs';

export const profileUpdated = fromEvent<Partial<Profile>>(socket, 'profile update');
