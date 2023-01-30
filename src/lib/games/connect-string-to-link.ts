interface SteamConnect {
  server: string;
  port?: number;
  password?: string;
}

const parseConnectString = (connect: string): SteamConnect | undefined => {
  const match = connect.match(/^connect (.[^:;]+):?(\d+)?(?:;\s?password\s(.+))?$/);
  if (match && match[1]) {
    const ret: SteamConnect = { server: match[1] };

    if (match[2]) {
      ret.port = parseInt(match[2], 10);
    }

    if (match[3]) {
      ret.password = match[3];
    }

    return ret;
  }
};

export const connectStringToLink = (connectString: string) => {
  const connect = parseConnectString(connectString);
  if (connect) {
    let url = connect.server;
    if (connect.port) {
      url += ':' + connect.port;
    }

    if (connect.password) {
      url += '/' + connect.password;
    }

    return `steam://connect/${url}`;
  } else {
    return undefined;
  }
};
