import { db } from '../../database/dbconfig.js';
import { io } from '../../index.js';
import { users } from '../../index.js';
import { getChatMessages } from '../../utilis/getChatMessage.js';
import { handlePrivateMessage } from './privateMessage.js';

export const setUpSocketConnection = () => {
  io.on('connection', async (socket) => {
    console.log('User Connected with socketId:', socket.id);
    const userId = socket.data?.userId;
    console.log('userId in socketConnection:', userId);
    users.set(userId, socket.id);

    //get chat message if user didnt receive after going offline
    try {
      const messages = await getChatMessages(userId);
      messages.forEach((msg) => {
        io.to(socket.id).emit('privateMessage', {
          senderId: msg.senderId,
          message: msg.message,
        });
        db.collection('messages')
          .doc(msg.documentId)
          .delete()
          .then(() => console.log('message delete succesfully'))
          .catch((err) => console.log('error deleting messge:', err));
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      console.error('Unknow error Occured:', error);
    }

    //events
    socket.on('privateMessage', ({ recipientId, message }) =>
      handlePrivateMessage(socket, message, recipientId)
    );

    socket.on('disconnect', () => {
      // Remove the user from the `users` object
      const id = users.get(userId);
      if (id) {
        users.delete(id);
        console.log(`User with userId:${userId} disconnected`);
      }
    });
  });
};
