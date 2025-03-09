'use client';

import ChatItem from './ChatItem';
import { Chat } from './UserSearchResults';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getAllChatList } from './ChatList';

const ChatListWrapper = ({
  chatList,
  userId,
}: {
  chatList: Chat[];
  userId: string;
}) => {
  const { data: chats } = useSuspenseQuery({
    queryKey: ['chats', userId],
    queryFn: () => getAllChatList(userId),
    initialData: chatList,
    staleTime: 6 * 1000,
  });

  return (
    <>
      {chats.map((chat: Chat) => (
        <ChatItem key={chat.id} {...chat} />
      ))}
    </>
  );
};

export default ChatListWrapper;
