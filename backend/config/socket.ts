import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { authMiddleware } from '../sockets/middleware';

//creating http server
export const configureSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.use(authMiddleware);
  return io;
};
