export const getMapName = (fullMapName: string) =>
  fullMapName.match(/^([a-z]+_[a-zA-Z0-9]+)/)?.[0] ?? 'unknown';
