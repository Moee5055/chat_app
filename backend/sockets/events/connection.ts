import { io } from '../../index.js';
import { users } from '../../index.js';
import { handlePrivateMessage } from './privateMessage.js';

export const setUpSocketConnection = () => {
  io.on('connection', async (socket) => {
    console.log('User Connected with socketId:', socket.id);
    const userId = socket.data?.userId;
    users.set(userId, socket.id);

    //events
    socket.on('privateMessage', ({ recipientId, message }) =>
      handlePrivateMessage(message, recipientId)
    );

    socket.on('disconnect', () => {
      // Remove the user from the `users` object
      const id = users.get(userId);
      if (id) {
        users.delete(userId);
        console.log(`User with userId:${userId} disconnected`);
      }
    });
  });
};
