'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Copy,
  Forward,
  Reply,
  MoreVertical,
  Phone,
  Video,
  Search,
  SendHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
//socket import
import { io } from 'socket.io-client';
import { useAuth } from '@clerk/nextjs';

const initialMessages = [
  { id: 1, role: 'user', content: "Hey there! How's it going?", timestamp: '10:30 AM' },
  {
    id: 2,
    role: 'assistant',
    content: "Hello! I'm doing great, thanks for asking. How about you?",
    timestamp: '10:31 AM',
  },
  {
    id: 3,
    role: 'user',
    content: "I'm good too! Just working on a new project. It's pretty exciting.",
    timestamp: '10:33 AM',
  },
  {
    id: 4,
    role: 'assistant',
    content: 'That sounds interesting! What kind of project are you working on?',
    timestamp: '10:34 AM',
  },
  {
    id: 5,
    role: 'user',
    content: "I'm building a chat application with AI integration. It's challenging but fun!",
    timestamp: '10:36 AM',
  },
  {
    id: 6,
    role: 'assistant',
    content:
      "Wow, that's awesome! Chat applications with AI can be really powerful tools. Are you using any specific frameworks or libraries for this project?",
    timestamp: '10:37 AM',
  },
];

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Chat() {
  const { getToken } = useAuth();

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  useEffect(() => {
    const connectSocket = async () => {
      const token = await getToken();
      const socket = io(backendUrl, {
        auth: { token },
      });
      socket.on('connect', () => {
        console.log('connected to server');
      });
      socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });
      socket.on('disconnect', () => {
        console.log('disconnect from websocket');
      });
      return () => {
        socket.disconnect();
      };
    };
    connectSocket();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        role: 'user',
        content: input.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleForward = (content: string) => {
    // Implement forward functionality
    console.log('Forward:', content);
  };

  const handleReply = (content: string) => {
    // Implement reply functionality
    console.log('Reply:', content);
  };

  return (
    <div className="h-screen bg-background">
      <Card className="h-full w-full shadow-none rounded-none border-0">
        <CardHeader className="border-b border-border px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold text-foreground">AI Assistant</h2>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                  <DropdownMenuItem>Block</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[80vh] px-4">
            {messages.map((m) => (
              <ContextMenu key={m.id}>
                <ContextMenuTrigger>
                  <div
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    <div
                      className={`flex items-start ${
                        m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      } gap-2 max-w-[80%]`}
                    >
                      <Avatar className="mt-1">
                        <AvatarFallback>{m.role === 'user' ? 'U' : 'AI'}</AvatarFallback>
                        <AvatarImage
                          src={
                            m.role === 'user'
                              ? '/placeholder.svg?height=32&width=32'
                              : '/placeholder.svg?height=32&width=32'
                          }
                        />
                      </Avatar>
                      <div className="flex flex-col">
                        <div
                          className={`p-3 rounded-lg ${
                            m.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          {m.content}
                        </div>
                        <div
                          className={`text-xs text-muted-foreground mt-1 ${
                            m.role === 'user' ? 'text-right' : 'text-left'
                          }`}
                        >
                          {m.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onSelect={() => handleCopy(m.content)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </ContextMenuItem>
                  <ContextMenuItem onSelect={() => handleForward(m.content)}>
                    <Forward className="mr-2 h-4 w-4" />
                    Forward
                  </ContextMenuItem>
                  <ContextMenuItem onSelect={() => handleReply(m.content)}>
                    <Reply className="mr-2 h-4 w-4" />
                    Reply
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
