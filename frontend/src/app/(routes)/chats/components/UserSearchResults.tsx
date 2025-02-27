'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const handleSearchUser = async (searchQuery: string) => {
  const response = await axios.get(`${url}/api/users/${searchQuery}`);
  return response.data;
};
const UserSearchResults = ({ searchQuery }: { searchQuery: string }) => {
  //query
  const { data } = useSuspenseQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => handleSearchUser(searchQuery),
  });
  console.log(data);
  return <div></div>;
};

export default UserSearchResults;
