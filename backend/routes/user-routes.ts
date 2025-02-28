import express from 'express';
import {
  handleGetAllUsers,
  handleSearchUser,
  handleUserRegistration,
} from '../controllers/user-controller.js';

const router = express.Router();

// this route create a new user in mongodb when user signup through clerk
router
  .post('/webhooks/clerk', handleUserRegistration as express.RequestHandler)
  .get('/users', handleGetAllUsers as express.RequestHandler)
  .get('/users/:username', handleSearchUser as express.RequestHandler);
// .get('users/:id', handleGetUserWithId as express.RequestHandler)

export default router;
