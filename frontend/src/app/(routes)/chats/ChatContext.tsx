'use client';

import { createContext, useEffect, useRef, useState } from 'react';
import type { UserData } from './components/UserSearchResults';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';
import { Message } from './types/messageType';
import { useAuth } from '@clerk/nextjs';
import { backendUrl } from './components/ChatBody';

type ChatContextType = {
  selectedUser: UserData;
  handleSelectedUser: (user: UserData) => void;
  sheetOpen: boolean;
  handleSheetOpen: () => void;
  selectedChatId: string;
  handleSelectedChatId: (id: string) => void;
  userId: string | null | undefined;
  socket: Socket | null;
};

const selectedUser = {
  email: '',
  profilePicture: '',
  userId: '',
  username: '',
  chats: [],
  id: '',
};

export const ChatContext = createContext<ChatContextType>({
  selectedUser,
  handleSelectedUser: () => {},
  sheetOpen: false,
  handleSheetOpen: () => {},
  selectedChatId: '',
  handleSelectedChatId: () => {},
  userId: '',
  socket: null,
});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  //stable queryClient instance
  const queryClientRef = useRef<QueryClient | null>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5000,
        },
      },
    });
  }
  const [socket, setSocket] = useState<Socket | null>(null);
  const { userId, getToken } = useAuth();
  //global user Selected
  const [user, setUser] = useState<UserData>(selectedUser);
  const handleSelectedUser = (user: UserData) => {
    setUser(user);
  };
  //sheet open global state
  const [sheetOpen, setSheetOpen] = useState(false);
  const handleSheetOpen = () => {
    setSheetOpen((prev) => !prev);
  };
  //chat id selection
  const [selectedId, setSelectedId] = useState('');
  const handleSelectedChatId = (id: string) => {
    setSelectedId(id);
  };

  //socket connection
  useEffect(() => {
    let socketInstance: Socket | null;
    const connectSocket = async () => {
      const token = await getToken();
      socketInstance = io(backendUrl, {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
      socketInstance.on('connect', () => {
        console.log('connected to server');
      });

      socketInstance.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });
      socketInstance.on('disconnect', () => {
        console.log('disconnect from websocket');
      });
      setSocket(socketInstance);
    };
    connectSocket();
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        setSocket(null);
        console.log('cleaning up socket connection');
      }
    };
  }, [getToken]);

  //listening for socket event
  useEffect(() => {
    if (!socket) return;
    const queryClient = queryClientRef.current;
    if (!queryClient) return;

    const messageHandler = ({ message }: { message: Message }) => {
      queryClient.setQueryData(
        ['messages', message.chatId],
        (oldData: Message[]) => {
          if (oldData) {
            return [...oldData, message];
          }
          return [message];
        }
      );
      //Update the chat list to show latest message
      queryClient.invalidateQueries({ queryKey: ['chats', userId] });
    };

    socket.on('privateMessage', messageHandler);
    console.log('Listening for privateMessage events');

    return () => {
      if (socket) {
        socket.off('privateMessage', messageHandler);
      }
      console.log('Stopped listening for private Message');
    };
  }, [selectedId, userId, socket]);

  return (
    <ChatContext
      value={{
        selectedUser: user,
        handleSelectedUser,
        handleSheetOpen,
        sheetOpen,
        handleSelectedChatId,
        selectedChatId: selectedId,
        userId,
        socket,
      }}
    >
      <QueryClientProvider client={queryClientRef.current}>
        {children}
      </QueryClientProvider>
    </ChatContext>
  );
};

export default ChatContextProvider;
