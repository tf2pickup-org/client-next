import type { Player } from './models/player';

export interface PlayerGroup {
  key: string;
  players: Player[];
}

export const groupPlayers = (players: Player[]): PlayerGroup[] => {
  const grouped = players.reduce<Record<string, Player[]>>((result, player) => {
    let key = player.name
      .replaceAll(/[^A-Za-z0-9]/g, '')
      .charAt(0)
      .toLocaleLowerCase();
    if (key.length === 0) {
      key = '.';
    }
    result[key] = result[key] || [];
    result[key].push(player);

    return result;
  }, {});

  return Object.keys(grouped)
    .map(key => ({ key, players: grouped[key] }))
    .sort((a, b) => a.key.localeCompare(b.key));
};
