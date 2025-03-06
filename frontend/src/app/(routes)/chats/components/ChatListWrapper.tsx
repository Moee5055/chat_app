'use client';

import { Suspense } from 'react';

import ChatItem from './ChatItem';
import UserSkeleton from './skeletons/userSkeleton';
import { Chat } from './UserSearchResults';

const ChatListWrapper = ({ chatList }: { chatList: Chat[] }) => {
  return (
    <>
      <Suspense fallback={<UserSkeleton />}>
        {chatList.map((chat: Chat) => (
          <ChatItem key={chat.id} {...chat} />
        ))}
      </Suspense>
    </>
  );
};

export default ChatListWrapper;
