'use client';

import { createContext, useState } from 'react';
import type { UserData } from './components/UserSearchResults';

type ChatContextType = {
  selectedUser: UserData;
  handleSelectedUser: (user: UserData) => void;
  sheetOpen: boolean;
  handleSheetOpen: () => void;
  selectedChatId: string;
  handleSelectedChatId: (id: string) => void;
};

const selectedUser = {
  email: '',
  profilePicture: '',
  userId: '12345',
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
});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <ChatContext
      value={{
        selectedUser: user,
        handleSelectedUser,
        handleSheetOpen,
        sheetOpen,
        handleSelectedChatId,
        selectedChatId: selectedId,
      }}
    >
      {children}
    </ChatContext>
  );
};

export default ChatContextProvider;
