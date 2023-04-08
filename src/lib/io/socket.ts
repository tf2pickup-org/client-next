import { apiUrl } from '$environment';
import { fetchWsToken } from './api/fetch-ws-token';
import { ioConnected } from './io.store';
import { io } from 'socket.io-client';

export const socket = io(apiUrl, {
  secure: true,
  reconnection: true,
  rejectUnauthorized: false,
  autoConnect: false,
});

socket.on('connect_error', async error => {
  switch (error.message) {
    case 'invalid signature':
    case 'jwt expired': {
      const wsToken = await fetchWsToken();
      connect(wsToken);
      break;
    }

    default:
      console.error(error);
  }
});

socket.on('exception', ({ message }) => {
  console.error(message);
});

socket.on('connect', () => ioConnected.set(true));
socket.on('disconnect', () => ioConnected.set(false));

export const connect = async (token?: string | undefined) => {
  if (token) {
    socket.auth = { token: `Bearer ${token}` };
  }
  socket.connect();
};
