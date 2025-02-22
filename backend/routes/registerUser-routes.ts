import { Router } from 'express';
import { handleUserRegistration } from '../controllers/userRegister-controller.js';

const router = Router();

// @ts-ignore
// this route create a new user in mongodb when user signup through clerk
router.post('/clerk', handleUserRegistration);

export default router;
