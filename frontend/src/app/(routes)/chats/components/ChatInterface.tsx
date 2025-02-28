'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import { Suspense, use } from 'react';
import ChatHeaderSkeleton from './skeletons/ChatHeaderSkeleton';
import ChatBodySkeleton from './skeletons/ChatBodySkeletion';
import { ChatContext } from '../ChatContext';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const chatQueryClient = new QueryClient();

const ChatInterface = () => {
  const { selectedUser, handleSheetOpen } = use(ChatContext);

  return (
    <QueryClientProvider client={chatQueryClient}>
      <Card className="h-full w-full shadow-none rounded-none border-0 bg-secondary/50">
        {selectedUser.userId ? (
          <>
            <Suspense fallback={<ChatHeaderSkeleton />}>
              <ChatHeader />
            </Suspense>
            <Suspense fallback={<ChatBodySkeleton />}>
              <ChatBody />
            </Suspense>
          </>
        ) : (
          <CardContent className="bg-secondary h-screen flex items-center justify-center">
            <div className="max-w-md mx-auto flex flex-col items-center text-center">
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                Welcome to Chatter
              </h2>
              <p className="text-muted-foreground mb-8 max-w-sm text-md">
                Connect with friends, family, and colleagues through instant
                messaging. Select a chat or start a new conversation.
              </p>
              <Button className="gap-2" onClick={handleSheetOpen}>
                <MessageSquarePlus className="h-5 w-5 " />
                <span>Start a new conversation</span>
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </QueryClientProvider>
  );
};

export default ChatInterface;
