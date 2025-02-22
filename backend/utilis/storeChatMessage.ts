import admin, {db} from "../database/dbconfig"

export async function storeChatMessage(senderId:string, recipientId: string, message: string) {
    try {
      const messageData = {
        senderId,
        recipientId,
        message,
        timestamp: admin.firestore.FieldValue.serverTimestamp(), // Automatically adds the server timestamp
      };

      // Add the message to the "messages" collection
      const docRef = await db.collection('messages').add(messageData);
      console.log('Message stored with ID:', docRef.id);
    } catch (error) {
      console.error('Error storing message:', error);
    }
  }
