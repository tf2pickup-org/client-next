import { callSocket } from '$lib/io/call-socket';
import { profile } from '$lib/profile/profile.store';

export const voteForMap = async (map: string) => {
  const mapVote = await callSocket<string>('vote for map', { map });
  profile.update(profile => ({ ...profile, mapVote }));
};
