'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface User {
  id: string;
  name: string;
  email: string;
}

const AddUser = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // Replace this with your actual API endpoint
        const response = await fetch(`/api/users/search?query=${searchQuery}`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    if (searchQuery) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[24rem]" side="left">
        <SheetHeader>
          <SheetTitle>Add User</SheetTitle>
          <SheetDescription>Search for users to add to your project.</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          <ScrollArea className="rounded-md  p-4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <UserSkeleton key={index} />
                ))}
              </div>
            ) : users.length === 0 && searchQuery ? (
              <p className="text-sm text-muted-foreground">No users found</p>
            ) : (
              <ul className="space-y-4">
                {users.map((user) => (
                  <li key={user.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Add
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const UserSkeleton = () => (
  <div className="flex items-center justify-between">
    <div className="space-y-2">
      <div className="h-4 w-[150px] bg-muted rounded animate-pulse" />
      <div className="h-3 w-[200px] bg-muted rounded animate-pulse" />
    </div>
    <div className="h-8 w-16 bg-muted rounded animate-pulse" />
  </div>
);

export default AddUser;
