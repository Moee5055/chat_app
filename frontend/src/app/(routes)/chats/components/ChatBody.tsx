'use client';

import { use } from 'react';
import { CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Copy, Forward, Reply } from 'lucide-react';
import { SendHorizontal } from 'lucide-react';

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { type Message } from '../types/messageType';
import { ChatContext } from '../ChatContext';

export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getChatMessages = async (chatId: string) => {
  try {
    const response = await axios.get(`${backendUrl}/api/chats`, {
      params: { chatId },
    });
    return response.data?.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting Messages');
  }
};

const ChatBody = () => {
  //queryClient
  const queryClient = useQueryClient();
  //reading from context
  const {
    selectedChatId: chatId,
    selectedUser,
    userId,
    socket,
  } = use(ChatContext);
  //getting all chats query
  const { data: messages } = useSuspenseQuery({
    queryKey: ['messages', chatId],
    queryFn: () => getChatMessages(chatId),
  });
  //sending message
  const messageSend = useMutation({
    mutationFn: (message: Message) => {
      return axios.post(`${backendUrl}/api/chats/sendMessage`, message);
    },
    onSuccess: () => {
      console.log('Message sent success');
    },
  });

  const handleSubmitForm = (formData: FormData) => {
    const message = formData.get('message');
    const newMessage: Message = {
      id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: message as string,
      chatId: chatId,
      senderId: userId as string,
      type: 'private',
      status: 'sent',
      callType: '',
      readMessage: false,
    };
    try {
      queryClient.setQueryData(['messages', chatId], (oldData: Message[]) => {
        return oldData ? [...oldData, newMessage] : [newMessage];
      });
      messageSend.mutate(newMessage, {
        onSuccess: () => {
          console.log('message sent success');
          if (socket) {
            socket.emit('privateMessage', {
              recipientId: selectedUser.userId,
              message: newMessage,
            });
            console.log('emitted privateMessage', newMessage);
          }
          //updating the chat list to reflect the new message
          queryClient.invalidateQueries({ queryKey: ['chats', userId] });
        },
        onError: (error) => {
          console.error('Error sending message:', error);
          queryClient.setQueryData(
            ['messages', chatId],
            (oldData: Message[]) => {
              if (!oldData) return [];
              return oldData.filter((msg) => msg.id !== newMessage.id);
            }
          );
        },
      });
    } catch (error) {
      console.log('error sending message', error);
      throw new Error('error sending message');
    }
  };

  const handleForward = (content: string) => {
    // Implement forward functionality
    console.log('Forward:', content);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleReply = (content: string) => {
    // Implement reply functionality
    console.log('Reply:', content);
  };

  return (
    <>
      <CardContent className="p-0">
        <ScrollArea className="h-[80vh] px-4 py-3">
          {messages.map((m: Message) => (
            <ContextMenu key={m.id}>
              <ContextMenuTrigger>
                <div
                  className={`flex ${
                    m.senderId === userId ? 'justify-end' : 'justify-start'
                  } mb-4`}
                >
                  <div
                    className={`flex items-start ${
                      m.senderId === userId ? 'flex-row-reverse' : 'flex-row'
                    } gap-2 max-w-[80%]`}
                  >
                    <Avatar className="mt-1">
                      <AvatarFallback>
                        {m.senderId === userId ? 'U' : 'AI'}
                      </AvatarFallback>
                      <AvatarImage
                        src={
                          m.senderId === userId
                            ? '/placeholder.svg?height=32&width=32'
                            : '/placeholder.svg?height=32&width=32'
                        }
                      />
                    </Avatar>
                    <div className="flex flex-col">
                      <div
                        className={`p-3 rounded-lg ${
                          m.senderId === userId
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        {m.content}
                      </div>
                      <div
                        className={`text-xs text-muted-foreground mt-1 ${
                          m.senderId === userId ? 'text-right' : 'text-left'
                        }`}
                      >
                        {m.timestamp &&
                          new Date(m.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
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
        <form action={handleSubmitForm} className="flex w-full space-x-2">
          <Input
            name="message"
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </>
  );
};

export default ChatBody;
