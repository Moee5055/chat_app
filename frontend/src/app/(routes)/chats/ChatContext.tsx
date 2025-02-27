'use client';

import { createContext, useState } from 'react';

type ChatContextType = {
  selectedId: string;
  handleSelectedId: (id: string) => void;
};

export const ChatContext = createContext<ChatContextType>({
  selectedId: '',
  handleSelectedId: () => {},
});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedId, setSelectedId] = useState<string>('');
  const handleSelectedId = (id: string) => {
    setSelectedId(id);
  };
  return (
    <ChatContext
      value={{
        selectedId,
        handleSelectedId,
      }}
    >
      {children}
    </ChatContext>
  );
};

export default ChatContextProvider;
