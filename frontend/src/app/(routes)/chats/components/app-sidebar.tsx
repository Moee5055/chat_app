'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  EllipsisVertical,
  Filter,
  LogOut,
  Search,
  Sparkles,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  // SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AddUser from './AddUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const buttons = ['All', 'Unread', 'Favorites', 'Groups'];
const user = {
  name: 'shacn',
  email: 'm@example.com',
  avatar: 'https://github.com/shadcn.png',
};

const queryClient = new QueryClient();

export function ChatSidebar({ children }: { children: React.ReactNode }) {
  const { isMobile } = useSidebar();
  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar
        variant="sidebar"
        className="bg-background border-r border-border"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex justify-between items-center">
                <h2 className="lg:text-[1.4rem] font-bold text-foreground ml-3 mt-2">
                  Chats
                </h2>
                <div className="flex gap-4 items-center">
                  <AddUser />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVertical className="cursor-pointer text-muted-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[200px] transition-all duration-300 ease-in-out"
                      sideOffset={8}
                    >
                      <DropdownMenuItem className="cursor-pointer">
                        <span>New group</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <span>Starred Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <span>Select Chats</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {/* search */}
              <div className="mt-4">
                <div className="flex items-center px-4 border border-input rounded-full py-[0.2rem] bg-background">
                  <Search className="text-muted-foreground" />
                  <Input
                    className="outline-none border-none shadow-none font-normal tracking-wide"
                    placeholder="Search chats..."
                  />
                  <Filter className="text-muted-foreground" size={22} />
                </div>
              </div>
              {/* buttons */}
              <div className="space-x-3 mt-3 px-4">
                {buttons.map((btn, index) => {
                  return (
                    <Button
                      key={index}
                      size="sm"
                      variant="secondary"
                      className="font-semibold"
                    >
                      {btn}
                    </Button>
                  );
                })}
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* chat list here */}
                {children}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side={isMobile ? 'bottom' : 'right'}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user.name}
                        </span>
                        <span className="truncate text-xs">{user.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </QueryClientProvider>
  );
}
