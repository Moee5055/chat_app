'use client';

import { use } from 'react';
import axios from 'axios';
import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
//icons
import { Phone, Check, CheckCheck, Trash } from 'lucide-react';
//shadcn components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
} from '@/components/ui/context-menu';
import { url, type UserData, type Chat } from './UserSearchResults';
import { ChatContext } from '../ChatContext';
import { ContextMenuTrigger } from '@radix-ui/react-context-menu';

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

export const getUserDataOptions = (id: string) => {
  return queryOptions({
    queryKey: ['user', id],
    queryFn: () => getUserData(id),
  });
};

export default function ChatItem(chat: Chat) {
  //context data
  const { userId, handleSelectedChatId, handleSelectedUser } = use(ChatContext);
  //query Client instance
  const queryClient = useQueryClient();
  //query data
  const userId2 = chat.participants.filter((id) => userId != id);
  const { data: user } = useSuspenseQuery(getUserDataOptions(userId2[0]));
  const newChat = { ...chat, status: 'sent', callType: '' };
  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return axios.delete(`${url}/api/chats/`, {
        params: { id },
      });
    },
    onSuccess: () => {
      toast('Chat Delete Successfully');
      queryClient.invalidateQueries({ queryKey: ['chats', userId] });
      handleSelectedChatId('');
      handleSelectedUser({} as UserData);
    },
  });

  const handleDeleteChat = async (id: string) => {
    let originalChats: Chat[];
    queryClient.setQueryData(['chats', userId], (oldData: Chat[]) => {
      originalChats = [...oldData];
      return oldData.filter((chat) => chat.id != id);
    });
    try {
      deleteMutation.mutate(
        { id },
        {
          onError: (error) => {
            console.log('Error deleting chat', error);
            queryClient.setQueryData(['chats', userId], (oldData: Chat[]) => {
              if (!oldData) return [];
              return [...originalChats];
            });
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
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
                        <CheckCheck
                          size={18}
                          className="text-muted-foreground"
                        />
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
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem
          className="flex justify-between items-center cursor-pointer group"
          onClick={() => handleDeleteChat(chat.id)}
        >
          <span className="group-hover:text-red-500 text-sm">Delete</span>{' '}
          <Trash className="group-hover:stroke-red-500" size={18} />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
