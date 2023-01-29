import { fetchAllPlayers } from "$lib/players/api/fetch-all-players";
import type { PageLoad } from "./$types";

export const load = (async () => {
  const players = await fetchAllPlayers();
  return { players };
}) satisfies PageLoad;
