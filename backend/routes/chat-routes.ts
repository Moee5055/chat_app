import express from 'express';
import { Router } from 'express';
import {
  handleFindOrCreateChat,
  handleGetChatList,
  handleSendMessage,
} from '../controllers/chat-controller';

const router = Router();

router
  .post('/', handleFindOrCreateChat as express.RequestHandler)
  .post('/sendMessage', handleSendMessage as express.RequestHandler)
  .get('/chatList/:id', handleGetChatList as express.RequestHandler);
export default router;
