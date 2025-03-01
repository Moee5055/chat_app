import { auth } from '@clerk/nextjs/server';
import ChatItem from './ChatItem';
import axios from 'axios';
import { Chat } from './UserSearchResults';
/*
const chats: {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'sent' | 'delivered' | 'read';
  isOnline: boolean;
  callType: 'voice' | 'video' | null;
}[] = [
  {
    id: 1,
    name: 'John Doe',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Hey, how are you doing?',
    timestamp: '10:30 AM',
    unreadCount: 3,
    status: 'read',
    isOnline: true,
    callType: null,
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Voice call',
    timestamp: 'Yesterday',
    unreadCount: 0,
    status: 'delivered',
    isOnline: false,
    callType: 'voice',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Thanks for your help!',
    timestamp: '2 days ago',
    unreadCount: 1,
    status: 'sent',
    isOnline: true,
    callType: null,
  },
]; */

const backendURl = process.env.NEXT_PUBLIC_BACKEND_URL;

const getAllChatList = async (userId: string) => {
  try {
    const response = await axios.get(
      `${backendURl}/api/chats/chatList/${userId}`
    );
    return response.data?.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error:', error.message);
    }
  }
};

export default async function ChatList() {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const chatList = await getAllChatList(userId);

  if (chatList.length == 0) {
    return <div>No chats found</div>;
  }

  return (
    <div className="space-y-2">
      {chatList.map((chat: Chat) => (
        <ChatItem key={chat.id} {...chat} />
      ))}
    </div>
  );
}
