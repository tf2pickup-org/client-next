import type { Player } from '$lib/players/types/player';
import deburr from 'lodash/deburr';

export const groupPlayers = (players: Player[]): Map<string, Player[]> => {
  return players.reduce((result, player) => {
    let key = player.name
      .replace(
        /[\s\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]/gu,
        '',
      )
      .charAt(0)
      .toLocaleUpperCase();
    key = deburr(key);

    if (!/[a-zA-Z]/.test(key)) {
      key = '#';
    }

    if (!result.has(key)) {
      result.set(key, []);
    }
    result.get(key).push(player);

    return result;
  }, new Map());
};
