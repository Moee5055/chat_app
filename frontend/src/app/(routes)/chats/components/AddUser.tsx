'use client';

import { Suspense, useState } from 'react';
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
import UserSkeleton from './skeletons/userSkeleton';
import UserSearchResults from './UserSearchResults';

const AddUser = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
      <SheetContent className="sm:max-w-[24rem] bg-background" side="left">
        <SheetHeader>
          <SheetTitle>Add User</SheetTitle>
          <SheetDescription>
            Search for users to add to your project.
          </SheetDescription>
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
          <ScrollArea className="rounded-md py-4">
            <Suspense fallback={<UserSkeleton />}>
              <UserSearchResults searchQuery={searchQuery} />
            </Suspense>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddUser;
