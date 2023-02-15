import { socket } from '$lib/io/socket';
import type { Profile } from './models/profile';
import { fromEvent } from 'rxjs';

export const profileUpdated = fromEvent<Partial<Profile>>(socket, 'profile update');
