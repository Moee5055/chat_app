'use client';

import { use } from 'react';
import axios from 'axios';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Phone, Check, CheckCheck } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Chat } from './UserSearchResults';
import { ChatContext } from '../ChatContext';

const backendURl = process.env.NEXT_PUBLIC_BACKEND_URL;

const getUserData = async (id: string) => {
  try {
    const response = await axios.get(`${backendURl}/api/users/userid/${id}`);
    return response.data.data;
  } catch (error) {
    console.log('Error getting user Profile:', error);
    throw new Error('Error getting user');
  }
};

export default function ChatItem(chat: Chat) {
  //context data
  const { handleSelectedChatId, handleSelectedUser } = use(ChatContext);
  //query data
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', chat.participants[1]],
    queryFn: () => getUserData(chat.participants[1]),
  });
  const newChat = { ...chat, status: 'sent', callType: '' };

  return (
    <div
      className="hover:bg-accent transition-colors duration-200 rounded-lg p-3 flex items-center space-x-3 cursor-pointer border border-border"
      onClick={() => {
        handleSelectedChatId(chat.id);
        handleSelectedUser(user);
      }}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage
            src={`${
              user.profilePicture
                ? user.profilePicture
                : `https://github.com/shadcn.png`
            }`}
          />
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>
        {chat.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
        )}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-[1rem] text-foreground capitalize">
            {user.username}
          </h3>
          <span
            className={`text-xs ${
              chat.unreadCount > 0
                ? 'font-bold text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            {new Date(chat.updatedAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground truncate">
            {newChat.callType === 'voice' ? (
              <span className="flex items-center tracking-wide">
                <Phone size={14} className="mr-1" />
                Voice call
              </span>
            ) : (
              <span className="text-md tracking-wide">
                {chat.lastMessage.content}
              </span>
            )}
          </p>
          <div className="flex items-center space-x-1">
            {chat.unreadCount > 0 ? (
              <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {chat.unreadCount}
              </span>
            ) : (
              <>
                {newChat.status === 'sent' && (
                  <Check size={18} className="text-muted-foreground" />
                )}
                {newChat.status === 'delivered' && (
                  <div className="relative">
                    <CheckCheck size={18} className="text-muted-foreground" />
                  </div>
                )}
                {newChat.status === 'read' && (
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
