import { Socket } from 'socket.io';
import { io } from '../../index.js';
import { users } from '../../index.js';
import { type Message } from '../../utilis/getChatMessage.js';
import { storeChatMessage } from '../../utilis/storeChatMessage.js';

export const handlePrivateMessage = async (
  socket: Socket,
  message: string,
  recipientId: string
) => {
  const recipientSocketId = users.get(recipientId);
  if (recipientSocketId) {
    io.to(recipientSocketId).emit('privateMessage', {
      senderId: socket.id,
      message,
    } as Message);
    console.log(`Private message sent to ${recipientId}: ${message}`);
  } else {
    await storeChatMessage(socket.id, recipientId, message);
    console.log(`Recipent ${recipientId} is Offline. Messgae stored in Firestore`);
  }
};
