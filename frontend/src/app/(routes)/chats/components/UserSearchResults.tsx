'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { use } from 'react';
import { ChatContext } from '../ChatContext';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export type Chat = {
  id: string;
  type: string;
  participants: string[];
  lastMessage: JSON;
  createdAt: Date;
  updatedAt: Date;
};

export type UserData = {
  email: string;
  id: string;
  profilePicture: string;
  userId: string;
  username: string;
  chats: Chat[];
};

const handleSearchUser = async (searchQuery: string) => {
  const response = await axios.get(`${url}/api/users/${searchQuery}`);
  return response.data.data;
};
const UserSearchResults = ({ searchQuery }: { searchQuery: string }) => {
  const { handleSelectedId } = use(ChatContext);
  //query
  const { data } = useSuspenseQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => handleSearchUser(searchQuery),
  });

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
            onClick={() => handleSelectedId(user.userId)}
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
            <p className="capitalize font-semibold">{user.username}</p>
          </div>
        );
      })}
    </>
  );
};

export default UserSearchResults;
