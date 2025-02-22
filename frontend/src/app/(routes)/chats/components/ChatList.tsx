import ChatItem from './ChatItem';

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
];

export default function ChatList() {
  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <ChatItem key={chat.id} {...chat} />
      ))}
    </div>
  );
}
