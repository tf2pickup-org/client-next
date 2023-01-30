import { apiUrl } from '$environment';
import { io } from 'socket.io-client';
import { ioConnected } from './io.store';

export const socket = io(apiUrl, {
  secure: true,
  reconnection: true,
  rejectUnauthorized: false,
});

socket.on('connect_error', error => {
  console.error(error);
});

socket.on('exception', ({ message }) => {
  console.error(message);
});

socket.on('connect', () => ioConnected.set(true));
socket.on('disconnect', () => ioConnected.set(false));
