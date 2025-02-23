import http from 'http';
import app from './config/app';
import { configureSocket } from './config/socket';
import userRouter from './routes/user-routes.js';
import { setUpSocketConnection } from './sockets/events/connection';

const server = http.createServer(app);
export const io = configureSocket(server);
export const users = new Map();

//Registered Routes
app.use('/api', userRouter);

//Socket connection handling
setUpSocketConnection();

//server started
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on PORT-${PORT}`);
});
