import { callSocket } from '$lib/io/call-socket';
import type { Friendship } from '../types/friendship';

export const markAsFriend = (friendPlayerId: string | null) =>
  callSocket<Friendship[]>('mark friend', { friendPlayerId });
