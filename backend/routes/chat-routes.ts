import express from 'express';
import { Router } from 'express';
import {
  handleFindOrCreateChat,
  handleGetChatList,
  handleSendMessage,
} from '../controllers/chat-controller';

const router = Router();

router
  .get('/', handleFindOrCreateChat as express.RequestHandler)
  .post('/sendMessage', handleSendMessage as express.RequestHandler)
  .get('/chatList', handleGetChatList as express.RequestHandler);
export default router;
