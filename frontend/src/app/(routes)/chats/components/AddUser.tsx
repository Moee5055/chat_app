'use client';

import { Suspense, use, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
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
import { ChatContext } from '../ChatContext';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

const AddUser = () => {
  const { sheetOpen: open, handleSheetOpen: setOpen } = use(ChatContext);
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
            <QueryErrorResetBoundary>
              {({ reset }) => (
                <ErrorBoundary
                  onReset={reset}
                  FallbackComponent={({ error, resetErrorBoundary }) => (
                    <div className="p-4 bg-secondary border-2 border-destructive rounded-md shadow-md">
                      <h3 className="text-lg font-medium text-foreground">
                        Error Searching User
                      </h3>
                      <p className="mt-2 text-sm text-destructive-foreground">
                        {error.message}
                      </p>
                      <button
                        onClick={resetErrorBoundary}
                        className="mt-3 px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-red-700"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                >
                  <Suspense fallback={<UserSkeleton />}>
                    <UserSearchResults searchQuery={searchQuery} />
                  </Suspense>
                </ErrorBoundary>
              )}
            </QueryErrorResetBoundary>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddUser;
