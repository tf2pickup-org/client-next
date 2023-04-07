import { socket } from './socket';

export const callSocket = <T>(methodName: string, ...args: unknown[]) =>
  new Promise<T>(resolve =>
    socket.emit(methodName, ...(args.length > 0 ? args : [{}]), (response: T) => {
      resolve(response);
    }),
  );
