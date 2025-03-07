import { auth } from '@clerk/nextjs/server';
import ChatItem from './ChatItem';
import axios from 'axios';
import { Chat } from './UserSearchResults';
import { Suspense } from 'react';
import UserSkeleton from './skeletons/userSkeleton';

const backendURl = process.env.NEXT_PUBLIC_BACKEND_URL;

const getAllChatList = async (userId: string) => {
  try {
    const response = await axios.get(
      `${backendURl}/api/chats/chatList/${userId}`
    );
    return response.data?.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error:', error.message);
    }
  }
};

export default async function ChatList() {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const chatList = await getAllChatList(userId);

  if (!chatList) {
    return (
      <div className="pt-10 ml-20 text-lg font-semibold">No chats found</div>
    );
  }

  return (
    <div className="space-y-2">
      <Suspense fallback={<UserSkeleton />}>
        {chatList.map((chat: Chat) => (
          <ChatItem key={chat.id} {...chat} />
        ))}
      </Suspense>
    </div>
  );
}
