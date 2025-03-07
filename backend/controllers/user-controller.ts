import { WebhookEvent } from '@clerk/backend';
import { Request, Response } from 'express';
import { Webhook } from 'svix';
import { prisma } from '../config/prisma.js';

export const handleUserRegistration = async (req: Request, res: Response) => {
  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET env variable');
    return res.status(500).json({
      error: 'Missing CLERK_WEBHOOK_SECRET env variable',
    });
  }

  // Get the headers
  const svix_id = req.headers['svix-id'] as string;
  const svix_timestamp = req.headers['svix-timestamp'] as string;
  const svix_signature = req.headers['svix-signature'] as string;

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({
      error: 'Missing required Svix headers',
    });
  }

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    // Verify the webhook payload
    evt = wh.verify((req as any).rawBody, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).json({
      error: 'Error verifying webhook',
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created') {
    try {
      const { id, email_addresses, username } = evt.data;
      const primaryEmail = email_addresses?.[0]?.email_address;
      await prisma.$connect();
      await prisma.user.create({
        data: {
          userId: id,
          username: username,
          email: primaryEmail,
          profilePicture: '',
          chats: [],
        },
      });
      console.log('New user created in mongodb:', {
        userId: id,
        email: primaryEmail,
        username: username,
      });
      return res
        .status(200)
        .json({ message: 'successfully creating new user in database' });
    } catch (error) {
      console.error('Error creating user in database:', error);
      return res.status(500).json({ error: 'Error creating user in database' });
    } finally {
      await prisma.$disconnect();
    }
  }

  res.status(200).json({
    success: true,
    message: `Webhook received: ${eventType}`,
  });
};

export const handleGetAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).json({
      message: 'Success getting all users from database',
      data: users,
    });
  } catch (error) {
    console.log('Error getting all users:', error);
    res.status(500).json({ error: 'Error getting user from database' });
  }
};

export const handleSearchUser = async (req: Request, res: Response) => {
  console.log('search users get hit');
  const { username } = req.params;
  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          startsWith: username,
          mode: 'insensitive',
        },
      },
    });
    res.status(200).json({
      message: 'succes',
      data: users,
    });
  } catch (error) {
    console.error(`Error geting user with username ${username}`, error);
    res.status(400).json({
      message: `Error getting users`,
    });
  }
};

export const handleGetUserWithId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
    if (!user) return res.status(400).json({ message: 'User not found' });
    res.status(200).json({ message: 'success', data: user });
  } catch (error) {
    console.log('Error in route /api/users/:id ', error);
  }
};
