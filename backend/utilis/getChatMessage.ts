import { db } from '../database/dbconfig';
export interface Message {
  senderId: string; // ID of the sender
  recipientId: string; // ID of the recipient
  message: string; // The message content
  timestamp?: Date; // Timestamp of when the message was sent (optional)
  documentId: string;
}

export type UserMessage = {
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

export async function getChatMessages(recipientId: string): Promise<Message[]> {
  try {
    const messagesRef = db
      .collection('messages')
      .where('recipientId', '==', recipientId);
    const snapshot = await messagesRef.get();
    if (snapshot.empty) {
      console.log('No messages found for recipient:', recipientId);
      return [];
    }

    const messages: Message[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        documentId: doc.id,
        senderId: data.senderId,
        recipientId: data.recipientId,
        message: data.message,
        timestamp: data.timestamp?.toDate(), // Convert Firestore Timestamp to JavaScript Date
      });
    });
    return messages;
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return [];
  }
}
