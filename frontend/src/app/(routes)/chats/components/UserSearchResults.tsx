'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { AvatarImage } from '@radix-ui/react-avatar';
import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { use } from 'react';
import { ChatContext } from '../ChatContext';
import { Message } from '../types/messageType';

export const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export type Chat = {
  id: string;
  type: string;
  participants: string[];
  createdAt: Date;
  isOnline: boolean;
  status?: 'sent' | 'delivered' | 'read';
  callType?: 'voice' | 'video' | '';
  updatedAt: Date;
  lastMessage: Message;
  unreadCount: number;
};

export type UserData = {
  email: string;
  id: string;
  profilePicture: string;
  userId: string;
  username: string;
  chats: Chat[];
};

//query function
const handleSearchUser = async (searchQuery: string) => {
  try {
    const response = await axios.get(`${url}/api/users/${searchQuery}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting Users');
  }
};

//query option from tanstack
export const usersOptions = (username: string) => {
  return queryOptions({
    queryKey: ['search', username],
    queryFn: () => handleSearchUser(username),
  });
};

//main component
const UserSearchResults = ({ searchQuery }: { searchQuery: string }) => {
  const { handleSelectedUser, handleSheetOpen, handleSelectedChatId, userId } =
    use(ChatContext);
  const queryClient = useQueryClient();
  //query
  const { data } = useSuspenseQuery(usersOptions(searchQuery));
  //mutation query
  const mutation = useMutation({
    mutationFn: (userIds: {
      userId1: string | null | undefined;
      userId2: string;
    }) => {
      return axios.post(`${url}/api/chats`, userIds);
    },
    onSuccess: (data) => {
      toast('New Chat Created');
      handleSelectedChatId(data.data?.data?.id);
      queryClient.invalidateQueries({ queryKey: ['chats', userId] });
    },
  });

  const handleOnClick = (user: UserData) => {
    handleSelectedUser(user);
    mutation.mutate({ userId1: userId, userId2: user.userId });
    handleSheetOpen();
  };

  if (data.length == 0 && searchQuery) {
    return <p className="text-lg font-bold text-center">User Not Found</p>;
  }

  return (
    <>
      {data.map((user: UserData) => {
        return (
          <div
            className="flex space-x-4 mb-3 dark:bg-zinc-800/70 py-2 px-2 rounded-md shadow-xl cursor-pointer border-2"
            key={user.id}
            onClick={() => handleOnClick(user)}
          >
            <Avatar>
              <AvatarImage
                src={`${
                  user.profilePicture
                    ? user.profilePicture
                    : `https://github.com/shadcn.png`
                }`}
              />
              <AvatarFallback className="capitalize">
                {user.username[0]}
              </AvatarFallback>
            </Avatar>
            <p className="capitalize font-semibold">
              {`${user.username} ${user.userId === userId ? `(You)` : ''}`}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default UserSearchResults;
