export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type?: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  callType: 'voice' | 'video' | null;
  readMessage: boolean;
};
