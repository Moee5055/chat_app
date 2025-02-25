import { Phone, Check, CheckCheck } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatItemProps {
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'sent' | 'delivered' | 'read';
  isOnline: boolean;
  callType: 'voice' | 'video' | null;
}

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const getAllUserList = async () => {
  try {
    const response = await fetch(`${url}/api/users`);
    if (!response) {
      throw new Error('Error getting users list');
    }
    return response.json();
  } catch (error) {
    console.log('Error getting all user list:', error);
  }
};

export default async function ChatItem({
  name,
  // avatar,
  lastMessage,
  timestamp,
  unreadCount,
  status,
  isOnline,
  callType,
}: ChatItemProps) {
  const users = await getAllUserList();
  console.log(users);
  return (
    <div className="hover:bg-accent transition-colors duration-200 rounded-lg p-3 flex items-center space-x-3 cursor-pointer border border-border">
      <div className="relative">
        <Avatar>
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
        )}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-[1rem] text-foreground">{name}</h3>
          <span
            className={`text-xs ${
              unreadCount > 0
                ? 'font-bold text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            {timestamp}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground truncate">
            {callType === 'voice' ? (
              <span className="flex items-center tracking-wide">
                <Phone size={14} className="mr-1" />
                Voice call
              </span>
            ) : (
              <span className="text-md tracking-wide">{lastMessage}</span>
            )}
          </p>
          <div className="flex items-center space-x-1">
            {unreadCount > 0 ? (
              <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            ) : (
              <>
                {status === 'sent' && (
                  <Check size={18} className="text-muted-foreground" />
                )}
                {status === 'delivered' && (
                  <div className="relative">
                    <CheckCheck size={18} className="text-muted-foreground" />
                  </div>
                )}
                {status === 'read' && (
                  <div className="relative">
                    <CheckCheck size={18} className="text-primary" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
