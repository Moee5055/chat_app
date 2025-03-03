'use client';

import { use } from 'react';
import { ChatContext } from '../ChatContext';
import { UserData } from './UserSearchResults';

const ChatItemWrapper = ({
  children,
  chatId,
  user,
}: {
  children: React.ReactNode;
  chatId: string;
  user: UserData;
}) => {
  const { handleSelectedChatId, handleSelectedUser } = use(ChatContext);
  return (
    <div
      className="hover:bg-accent transition-colors duration-200 rounded-lg p-3 flex items-center space-x-3 cursor-pointer border border-border"
      onClick={() => {
        handleSelectedChatId(chatId);
        handleSelectedUser(user);
      }}
    >
      {children}
    </div>
  );
};

export default ChatItemWrapper;
