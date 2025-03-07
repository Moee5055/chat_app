import { auth } from '@clerk/nextjs/server';

import { SidebarProvider } from '@/components/ui/sidebar';
import { ChatSidebar } from '@/app/(routes)/chats/components/app-sidebar';
import ChatList from './components/ChatList';
import ChatContextProvider from './ChatContext';
import { Suspense } from 'react';
import UserSkeleton from './components/skeletons/userSkeleton';
import { ErrorBoundary } from 'react-error-boundary';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  return (
    <ChatContextProvider>
      <SidebarProvider>
        <ChatSidebar>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Suspense fallback={<UserSkeleton />}>
              <ChatList userId={userId} />
            </Suspense>
          </ErrorBoundary>
        </ChatSidebar>
        <main className="min-h-screen w-full overflow-y-hidden">
          {/* <SidebarTrigger /> */}
          {children}
        </main>
      </SidebarProvider>
    </ChatContextProvider>
  );
}
