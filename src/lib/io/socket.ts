import { apiUrl } from '$environment';
import { fetchWsToken } from './api/fetch-ws-token';
import { ioConnected } from './io.store';
import { io } from 'socket.io-client';

export const socket = io(apiUrl, {
  secure: true,
  reconnection: true,
  rejectUnauthorized: false,
  autoConnect: false,
  auth: async cb => {
    try {
      const token = await fetchWsToken();
      if (token) {
        cb({ token: `Bearer ${token}` });
      } else {
        cb({});
      }
    } catch (error) {
      console.error(error);
    }
  },
});

socket.on('exception', ({ message }) => {
  console.error(message);
});

socket.on('connect', () => ioConnected.set(true));
socket.on('disconnect', () => ioConnected.set(false));
