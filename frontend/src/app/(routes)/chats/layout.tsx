import { SidebarProvider } from '@/components/ui/sidebar';
import { ChatSidebar } from '@/app/(routes)/chats/components/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <main className="min-h-screen overflow-y-hidden">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
