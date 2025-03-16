import http from 'http';
import app from './config/app.js';
import { configureSocket } from './config/socket.js';
import { setUpSocketConnection } from './sockets/events/connection.js';

//routes
import userRouter from './routes/user-routes.js';
import chatRouter from './routes/chat-routes.js';
import { prisma } from './config/prisma.js';

const server = http.createServer(app);
export const io = configureSocket(server);
export const users = new Map();

//dbconnection check
const checkConnection = async () => {
  try {
    await prisma.$connect();
    console.log('db connected successfully');
  } catch (error) {
    console.log('Error connectioning to database');
  } finally {
    await prisma.$disconnect();
  }
};
checkConnection();

//Registered Routes
app.use('/api', userRouter);
app.use('/api/chats', chatRouter);

//Socket connection handling
setUpSocketConnection();

//server started
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on PORT-${PORT}`);
});
