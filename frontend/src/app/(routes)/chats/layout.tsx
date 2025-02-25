import { SidebarProvider } from '@/components/ui/sidebar';
import { ChatSidebar } from '@/app/(routes)/chats/components/app-sidebar';
import ChatList from './components/ChatList';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ChatSidebar>
        <ChatList />
      </ChatSidebar>
      <main className="min-h-screen overflow-y-hidden">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
