import { SidebarProvider } from '@/components/ui/sidebar';
import { ChatSidebar } from '@/app/(routes)/chats/components/app-sidebar';
import ChatList from './components/ChatList';
import ChatContextProvider from './ChatContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ChatContextProvider>
      <SidebarProvider>
        <ChatSidebar>
          <ChatList />
        </ChatSidebar>
        <main className="min-h-screen w-full overflow-y-hidden">
          {/* <SidebarTrigger /> */}
          {children}
        </main>
      </SidebarProvider>
    </ChatContextProvider>
  );
}
