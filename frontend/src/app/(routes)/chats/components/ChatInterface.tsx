'use client';

import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import { Suspense, use } from 'react';
import ChatBodySkeleton from './skeletons/ChatBodySkeletion';
import { ChatContext } from '../ChatContext';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ErrorBoundary } from 'react-error-boundary';

const chatQueryClient = new QueryClient();

const ChatInterface = () => {
  const { selectedUser, handleSheetOpen } = use(ChatContext);

  return (
    <QueryClientProvider client={chatQueryClient}>
      <Card className="h-full w-full shadow-none rounded-none border-0 bg-secondary/50">
        {selectedUser.userId ? (
          <>
            <QueryErrorResetBoundary>
              {({ reset }) => (
                <ErrorBoundary
                  onReset={reset}
                  FallbackComponent={({ error, resetErrorBoundary }) => (
                    <div className="h-screen flex items-center justify-center">
                      <div className="w-[300px] p-4 bg-secondary border-2 border-destructive rounded-md shadow-md">
                        <h3 className="text-lg font-medium text-foreground">
                          Error Getting Message
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
                    </div>
                  )}
                >
                  <Suspense fallback={<ChatBodySkeleton />}>
                    <ChatHeader />
                    <ChatBody />
                  </Suspense>
                </ErrorBoundary>
              )}
            </QueryErrorResetBoundary>
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
