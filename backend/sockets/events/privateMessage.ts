import { io } from '../../index.js';
import { users } from '../../index.js';
export type Message = {
  id?: string;
  chatId: string;
  senderId: string;
  content: string;
  type?: string;
  timestamp?: Date;
  status: 'sent' | 'delivered' | 'read';
  callType: 'voice' | 'video' | '';
  readMessage: boolean;
};

export const handlePrivateMessage = async (
  message: Message,
  recipientId: string
) => {
  console.log(`recipient id in privatemessage: ${recipientId}`);
  const recipientSocketId = users.get(recipientId);
  if (recipientSocketId) {
    io.to(recipientSocketId).emit('privateMessage', {
      message,
    });
    console.log(`Private message sent to ${recipientId}: ${message.content}`);
  }
};
