'use client';

import { createContext, useState } from 'react';
import type { UserData } from './components/UserSearchResults';

type ChatContextType = {
  selectedUser: UserData;
  handleSelectedUser: (user: UserData) => void;
  sheetOpen: boolean;
  handleSheetOpen: () => void;
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
});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData>(selectedUser);
  const handleSelectedUser = (user: UserData) => {
    setUser(user);
  };
  //sheet open global state
  const [sheetOpen, setSheetOpen] = useState(false);
  const handleSheetOpen = () => {
    setSheetOpen((prev) => !prev);
  };
  return (
    <ChatContext
      value={{
        selectedUser: user,
        handleSelectedUser,
        handleSheetOpen,
        sheetOpen,
      }}
    >
      {children}
    </ChatContext>
  );
};

export default ChatContextProvider;
