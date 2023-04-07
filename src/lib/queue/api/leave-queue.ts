import { callSocket } from '$lib/io/call-socket';
import { profile } from '$lib/profile/profile.store';
import type { QueueSlot } from '../types/queue-slot';

export const leaveQueue = async (): Promise<QueueSlot> => {
  const slot = await callSocket<QueueSlot>('leave queue');
  profile.update(profile => ({ ...profile, mapVote: undefined }));
  return slot;
};
