import { apiUrl } from '$environment';
import { ioConnected } from './io.store';
import jwtDecode from 'jwt-decode';
import { io } from 'socket.io-client';

export const socket = io(apiUrl, {
  secure: true,
  reconnection: true,
  rejectUnauthorized: false,
  autoConnect: false,
});

socket.on('connect_error', error => {
  switch (error.message) {
    case 'invalid signature':
    case 'jwt expired':
      localStorage.removeItem('ws_token');
      connect();
      break;

    default:
      console.error(error);
  }
});

socket.on('exception', ({ message }) => {
  console.error(message);
});

socket.on('connect', () => ioConnected.set(true));
socket.on('disconnect', () => ioConnected.set(false));

const refreshToken = async () => {
  const res = await fetch(`${apiUrl}/auth/wstoken`, { credentials: 'include' });
  if (res.ok) {
    const { wsToken } = await res.json();
    localStorage.setItem('ws_token', wsToken);
    return wsToken;
  } else {
    return null;
  }
};

const getWsToken = async () => {
  const wsToken = localStorage.getItem('ws_token');
  if (wsToken !== null) {
    const decoded = jwtDecode(wsToken) as { exp: number };
    if (Date.now() >= decoded.exp * 1000) {
      return await refreshToken();
    } else {
      return wsToken;
    }
  } else {
    return await refreshToken();
  }
};

const connect = async () => {
  const token = await getWsToken();
  if (token) {
    socket.auth = { token: `Bearer ${token}` };
  }
  socket.connect();
};

if (typeof window !== 'undefined') {
  connect();
}
