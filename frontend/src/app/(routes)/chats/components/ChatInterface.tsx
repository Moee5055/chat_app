'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import { Suspense } from 'react';
import ChatHeaderSkeleton from './skeletons/ChatHeaderSkeleton';
import ChatBodySkeleton from './skeletons/ChatBodySkeletion';

const chatQueryClient = new QueryClient();

const ChatInterface = () => {
  return (
    <QueryClientProvider client={chatQueryClient}>
      <Card className="h-full w-full shadow-none rounded-none border-0">
        <Suspense fallback={<ChatHeaderSkeleton />}>
          <ChatHeader />
        </Suspense>
        <Suspense fallback={<ChatBodySkeleton />}>
          <ChatBody />
        </Suspense>
      </Card>
    </QueryClientProvider>
  );
};

export default ChatInterface;
