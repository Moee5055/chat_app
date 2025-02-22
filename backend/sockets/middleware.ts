import { Socket } from 'socket.io';
import { verifyToken } from '@clerk/backend';

type SocketNext = (err?: Error) => void;

export const authMiddleware = async (socket: Socket, next: SocketNext) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) throw new Error('No token Provided');
    const decodedToken = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    const userId = decodedToken.sub;
    console.log('user Id in middleware:', userId);
    socket.data.userId = userId;
    next();
  } catch (error) {
    console.error('Socket auth failed:', error);
    next(new Error('Authentication failed:' + (error as Error).message));
  }
};
