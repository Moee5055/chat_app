import { z } from 'zod';
import { prisma } from '../config/prisma';
import { Request, Response } from 'express';

const ChatIds = z.object({
  userId1: z.string(),
  userId2: z.string(),
});

const Messagebody = z.object({
  content: z.string(),
  chatId: z.string(),
  senderId: z.string(),
  type: z.string(),
  status: z.string(),
  readMessage: z.boolean(),
  callType: z.string(),
});

export const handleFindOrCreateChat = async (req: Request, res: Response) => {
  const result = ChatIds.safeParse(req.body);
  // If validation fails, return a 400 error
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  // Extract userId1 and userId2 from the validated data
  const { userId1, userId2 } = result.data;
  console.log(userId1, userId2);
  try {
    const existingChat = await prisma.chat.findFirst({
      // where: {
      //   participants: {
      //     hasEvery: [userId1, userId2],
      //   },
      // }
      where: {
        AND: [
          {
            participants: {
              has: userId1,
            },
          },
          {
            participants: {
              has: userId2,
            },
          },
          {
            type: 'private',
          },
        ],
      },
    });
    if (existingChat) {
      return res
        .status(200)
        .json({ message: 'success: existing chat exits', data: existingChat });
    }

    const newChat = await prisma.chat.create({
      data: {
        type: 'private',
        participants: [userId1, userId2],
        lastMessage: {},
      },
    });
    console.log('new chat created');
    res
      .status(200)
      .json({ message: 'success: new chat created', data: newChat });
  } catch (error) {
    console.log('Error in chats:', error);
    res.status(400).json({ error });
  }
};

export const handleSendMessage = async (req: Request, res: Response) => {
  const result = Messagebody.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  const {
    content,
    chatId,
    senderId,
    type,
    callType,
    status = 'delivered',
    readMessage = false,
  } = result.data;

  try {
    const message = await prisma.message.create({
      data: {
        chatId,
        content,
        status,
        readMessage,
        senderId,
        type,
        callType,
      },
    });
    //update last Message in chat
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        lastMessage: message,
      },
    });
    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log('Error sending Messgae:', error);
    res.status(400).json({ error });
  }
};

export const handleGetChatList = async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: 'User Id required' });
  }
  try {
    const chatList = await prisma.chat.findMany({
      where: {
        participants: {
          has: userId,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    console.log('handleGetchatlist');
    res.status(200).json({ message: 'success', data: chatList });
  } catch (error) {
    console.error('Error getting chatlist:', error);
    res.status(400).json({ error });
  }
};

export const handleGetAllMessage = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  try {
    const messages = await prisma.message.findMany({
      where: {
        chatId: chatId,
      },
    });
    console.log(messages);
    res.status(200).json({ message: 'success', data: messages });
  } catch (error) {
    console.error('Error getting messages:', error);
  }
};
