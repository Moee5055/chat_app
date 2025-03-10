import { Socket } from 'socket.io';
import { io } from '../../index.js';
import { users } from '../../index.js';
import { type Message, type UserMessage } from '../../utilis/getChatMessage.js';
import { storeChatMessage } from '../../utilis/storeChatMessage.js';

export const handlePrivateMessage = async (
  socket: Socket,
  message: UserMessage,
  recipientId: string
) => {
  console.log(`recipient id in privatemessage: ${recipientId}`);
  const recipientSocketId = users.get(recipientId);
  if (recipientSocketId) {
    io.to(recipientSocketId).emit('privateMessage', {
      message,
    });
    console.log(`Private message sent to ${recipientId}: ${message.content}`);
  } else {
    await storeChatMessage(socket.id, recipientId, message.content);
    console.log(
      `Recipent ${recipientId} is Offline. Messgae stored in Firestore`
    );
  }
};
